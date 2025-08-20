<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Konten;

Route::middleware('api')->get('/user', function (Request $request) {
    return $request->user();
});

// API route for getting kontens data
Route::get('/kontens', function () {
    $kontens = Konten::orderBy('tanggal_kegiatan', 'desc')->get();
    return response()->json($kontens);
});
