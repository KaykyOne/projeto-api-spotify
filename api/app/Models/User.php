<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

// User model for authentication and Spotify integration
// Stores user data with Spotify OAuth credentials and tokens
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     * These fields can be set directly from user input
     * 
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'spotify_id',           // Unique identifier from Spotify
        'spotify_access_token', // Token for API authentification
        'spotify_refresh_token', // Token to obtain new access tokens
        'spotify_expires_at',    // Expiration time of the access token
    ];

    /**
     * The attributes that should be hidden for serialization.
     * These fields are excluded when the model is converted to JSON
     *
     * @var list<string>
     */
    protected $hidden = [
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     * Defines automatic type casting for model attributes
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            // NOTE: Password field was removed, but cast still remains (cleanup needed)
        ];
    }
}
