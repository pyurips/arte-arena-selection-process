<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SyncLog extends Model
{
    protected $fillable = ['records_processed'];
    
    protected $casts = [
        'records_processed' => 'integer',
    ];
}
