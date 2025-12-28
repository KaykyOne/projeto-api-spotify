<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

// This controller handles Spotify OAuth authentification
// It retrives user data and tokens from Spotify API
class SpotifyController extends Controller
{
    /**
     * Initiates the Spotify login flow
     * Generates a random state and redirects user to Spotify authorization endpoint
     */
    public function login()
    {
        // Generate random state for CSRF proteccion
        $state = Str::random(16);
        // DB::table('sessions')->truncate();
        $callbackUrl = 'http://127.0.0.1:8000/spotify/callback';
        logger()->info('Login - Callback URL', ['url' => $callbackUrl]);

        $query = http_build_query([
            'response_type' => 'code',
            'client_id' => config('services.spotify.client_id'),
            'scope' => 'user-read-email user-read-private',
            'redirect_uri' => $callbackUrl,
            'state' => $state,
        ]);

        $authUrl = 'https://accounts.spotify.com/authorize?' . $query;

        return response()->json(['url' => $authUrl]);

    }

    /**
     * Handles the Spotify OAuth callback
     * Exchange the authorization code for access tokens
     */
    public function callback(Request $request)
    {
        // Spotify returns the same state that was sent
        // If we reach here, it means it realy came from Spotify
        logger()->info('Callback recieved', ['state' => $request->state, 'code' => $request->code]);

        if (!$request->state || !$request->code) {
            abort(400, 'State ou code faltando');
        }

        $response = Http::asForm()->post(
            'https://accounts.spotify.com/api/token',
            [
                'grant_type' => 'authorization_code',
                'code' => $request->code,
                'redirect_uri' => 'http://127.0.0.1:8000/spotify/callback',
                'client_id' => config('services.spotify.client_id'),
                'client_secret' => config('services.spotify.client_secret'),
            ]
        );

        if ($response->failed()) {
            abort(400, 'Erro ao obter token');
        }

        $tokenData = $response->json();

        // Retrieve user data from Spotify API using the access token
        $me = Http::withToken($tokenData['access_token'])
            ->get('https://api.spotify.com/v1/me')
            ->json();

        // Create or update user with Spotify data
        // Stores tokens for future API calls and refresh
        $user = User::updateOrCreate(
            ['spotify_id' => $me['id']],
            [
                'name' => $me['display_name'] ?? 'Spotify User',
                'email' => $me['email'],
                'spotify_access_token' => $tokenData['access_token'],
                'spotify_refresh_token' => $tokenData['refresh_token'],
                'spotify_expires_at' => now()->addSeconds($tokenData['expires_in']),
            ]
        );

        // Authenticate user in the application
        Auth::login($user);

        logger()->info('User logado com sucesso', ['user_id' => $user->id]);

        // Retorna HTML que redireciona e envia o cookie
        return redirect('http://localhost:3000/dashboard?token=' . $tokenData['access_token'] . '&user_id=' . $user->id);
    }

    /**
     * Search for artists on Spotify
     * Requires Bearer token in Authorization header
     */
    public function searchArtist(Request $request)
    {
        // Extract search parameters from request query
        $name = $request->query('name');
        $limit = min((int) $request->query('limit', 5), 50);
        $offset = (int) $request->query('offset', 0);

        // Validate required parameters
        if (!$name) {
            return response()->json(['error' => 'Name is required'], 400);
        }

        // Extract and validate Bearer token for Spotify API
        $token = $request->header('Authorization');
        if (!$token) {
            return response()->json(['error' => 'Token not provided'], 401);
        }

        $token = str_replace('Bearer ', '', $token);

        // Call Spotify API to search for artists by name
        // Returns paginated results with limit and offset
        $response = Http::withToken($token)->get(
            'https://api.spotify.com/v1/search',
            [
                'q' => $name,
                'type' => 'artist',
                'limit' => $limit,
                'offset' => $offset,
            ]
        );

        // Return the response from Spotify API as JSON
        return $response->json();
    }

    public function getArtistById(Request $request)
    {
        $id = $request->query('spotify_id');
        if(empty($id)) {
            return response()->json(['error' => 'Artist ID is required'], 400);
        }

         // Extract and validate Bearer token for Spotify API

        $token = $request->header('Authorization');

        if (!$token) {
            return response()->json(['error' => 'Token not provided'], 401);
        }

        $token = str_replace('Bearer ', '', $token);

        $response = Http::withToken($token)->get(
            "https://api.spotify.com/v1/artists/{$id}"
        );

        return $response->json();
    }

}

