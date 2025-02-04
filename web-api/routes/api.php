<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ItemController;

Route::post('/items', [ItemController::class, 'store']);
Route::get('/items/{title}', [ItemController::class, 'showByTitle']);
