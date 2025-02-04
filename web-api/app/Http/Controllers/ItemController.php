<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use Faker\Factory as Faker;

class ItemController extends Controller
{
    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255'
        ]);

        $faker = Faker::create();
        $loremIpsum = $faker->paragraph; 
        $item = Item::create([
            'title' => $validated['title'],
            'body'  => $loremIpsum
        ]);

        return response()->json($item, 201);
    }

    public function showByTitle($title) {
        $items = Item::where('title', 'like', '%' . $title . '%')
            ->limit(20)
            ->get();

        if ($items->isEmpty()) {
            return response()->json(['message' => 'Post não encontrado'], 404);
        }
        return response()->json($items);
    }
}
