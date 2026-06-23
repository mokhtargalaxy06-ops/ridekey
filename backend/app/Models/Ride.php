<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['id', 'title', 'price', 'startDate', 'startTime', 'endDate', 'endTime', 'image', 'video'])]
class Ride extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected function casts(): array
    {
        return [
            'video' => 'array',
        ];
    }
}
