<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hiring;

class HiringController extends Controller
{
    function create(Request $request)
    {
        error_log("Easdasdasd");
        logger()->info($request->all());
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

    function list(Request $request)
    {
        $user_id = $request->input('user_id');
        $hirings = Hiring::where('user_id', $user_id)->get();
        return response()->json(['message' => 'listagem com sucesso!', 'hirings' => $hirings], 200);
    }

    function delete(Request $request, $id)
    {
        $hiring = Hiring::find($id);
        if (!$hiring) {
            return response()->json(['message' => 'Hiring not found'], 404);
        }
        $hiring->delete();
        return response()->json(['message' => 'Hiring deleted successfully'], 200);
    }
}
