<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\SpotifyController;

// Welcome page endpoint
Route::get('/', function () {
    return view('welcome');
});

// Spotify OAuth endpoints
// These handle the login flow and authorization callback from Spotify

/**
 * Initiate Spotify login process
 * Redirects user to Spotify authorization page
 */
Route::get('/spotify/login', [SpotifyController::class, 'login'])->name('spotify.login');

/**
 * Spotify OAuth callback handler
 * Receives authorization code and exchanges it for access tokens
 * Creates or updates user record with Spotify data
 */
Route::get('/spotify/callback', [SpotifyController::class, 'callback'])->name('spotify.callback');

/**
 * Search for artists on Spotify
 * Requires Bearer token in Authorization header for API authentification
 */
Route::get('/spotify/search', [SpotifyController::class, 'searchArtist']);

Route::get('/spotify/searchid', [SpotifyController::class, 'getArtistById']);
