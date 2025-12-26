<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;


class SpotifyController extends Controller
{
    public function login()
    {
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

    public function callback(Request $request)
    {
        // Spotify retorna o mesmo state que foi enviado
        // Se chegou aqui, significa que veio mesmo da Spotify
        logger()->info('Callback recebido', ['state' => $request->state, 'code' => $request->code]);

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

        // pega dados do usuário
        $me = Http::withToken($tokenData['access_token'])
            ->get('https://api.spotify.com/v1/me')
            ->json();

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

        Auth::login($user);

        logger()->info('User logado com sucesso', ['user_id' => $user->id]);

        // Retorna HTML que redireciona e envia o cookie
        return redirect('http://localhost:3000/dashboard?token=' . $tokenData['access_token']);
    }

    public function searchArtist(Request $request, string $name)
    {
        $token = $request->header('Authorization'); // pega token da query
        if ($token) {
            $token = str_replace('Bearer ', '', $token);
        }else{
            return response()->json(['error' => 'Token não fornecido'], 401);
        }

        $response = Http::withToken($token)
            ->get('https://api.spotify.com/v1/search', [
                'q' => $name,
                'type' => 'artist',
                'limit' => 5,
            ]);

        return $response->json();
    }


}

