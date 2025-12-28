<?php

use App\Http\Controllers\HiringController;
use App\Models\Hiring;

Route::get('/hiring', [HiringController::class, 'list']);
Route::post('/hiring', [HiringController::class, 'create']);
Route::delete('/hiring/{id}', [HiringController::class, 'delete']);
Route::get('/ping', function () {
    return response()->json(['pong' => true]);
});
