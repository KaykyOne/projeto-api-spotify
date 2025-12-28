<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

// Hiring model represents a booking request for an artist
// Stores event details, pricing, and artist information
class Hiring extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     * Fields that can be setted directly from user input without validation
     *
     * @var list<string>
     */
    protected $fillable = [
        'value',           // Hiring price in currency
        'name',            // Artist name
        'spotify_id',      // Spotify artist ID for tracking
        'event_date',      // When the performance will occur
        'user_id',         // Reference to user who hired the artist
        'address'          // Event location address
    ];
}
