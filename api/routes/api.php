<?php

use App\Http\Controllers\HiringController;
use App\Models\Hiring;

// Hiring endpoints - CRUD operations for artist bookings
// WARNING: No authentification required - consider adding middleware

// Retrieve all hirings for a user
Route::get('/hiring', [HiringController::class, 'list']);

// Create a new hiring request
// NOTE: Should validate user ownership and input data
Route::post('/hiring', [HiringController::class, 'create']);

// Delete a hiring record by ID
// TODO: Add authorization check to ensure only owner can delete
Route::delete('/hiring/{id}', [HiringController::class, 'delete']);

// Health check endpoint
Route::get('/ping', function () {
    return response()->json(['pong' => true]);
});
