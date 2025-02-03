<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model {
    protected $fillable = [
        'external_id', 
        'title', 
        'body'
    ];

    protected $casts = [
        'external_id' => 'integer',
    ];
}
