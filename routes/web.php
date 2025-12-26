<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\SpotifyController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/spotify/login', [SpotifyController::class, 'login'])->name('spotify.login');
Route::get('/spotify/callback', [SpotifyController::class, 'callback'])->name('spotify.callback');

Route::get('/spotify/search/{name}', function (Request $request, string $name) {
    return app(SpotifyController::class)->searchArtist($request, $name);
});