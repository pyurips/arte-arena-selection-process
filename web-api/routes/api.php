<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemsController;

Route::post('/items', [ItemsController::class, 'store']);
Route::get('/items/{title}', [ItemsController::class, 'showByTitle']);
