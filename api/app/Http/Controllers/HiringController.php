<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hiring;

// Controller responsable for managing artist hiring requests
// Handles CRUD operations for hirings
class HiringController extends Controller
{
    /**
     * Create a new hiring record
     * Stores artist information and event details
     */
    function create(Request $request)
    {
        // Log the incoming request data for debugging
        logger()->info($request->all());
        
        // Create new hiring record with provided data
        // NOTE: Should validate input before using in production
        $hiring = Hiring::create([
            'value' => $request->input('value'),
            'name' => $request->input('name'),
            'spotify_id' => $request->input('spotify_id'),
            'event_date' => $request->input('event_date'),
            'user_id' => $request->input('user_id'),
            'address' => $request->input('address'),
        ]);

        $hiring->save();

        return response()->json(['message' => 'Hiring created successfully', 'hiring' => $hiring], 201);
    }

    /**
     * List all hirings for a specifick user
     * Retrives hiring records filtered by user ID
     */
    function list(Request $request)
    {
        logger()->info("Listing hirings for user_id: " . $request->input('user_id'));

        $user_id = $request->input('user_id');
        $hirings = Hiring::where('user_id', $user_id)->get();
        return response()->json(['message' => 'Hirings retrieved successfully!', 'hirings' => $hirings], 200);
    }

    /**
     * Delete a hiring record by ID
     * Removes the hiring from database if found
     */
    function delete(Request $request, $id)
    {
        // Find the hiring record
        $hiring = Hiring::find($id);
        
        // Check if hiring exists
        if (!$hiring) {
            return response()->json(['message' => 'Hiring not found'], 404);
        }
        
        // Delete the hiring record
        $hiring->delete();
        return response()->json(['message' => 'Hiring deleted successfully'], 200);
    }
}
