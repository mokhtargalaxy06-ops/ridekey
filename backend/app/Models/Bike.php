<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'id', 'name', 'brand', 'type', 'price', 'rentalRate', 'engine',
    'displacement', 'torque', 'topSpeed', 'power', 'weight', 'image',
    'gallery', 'description',
])]
class Bike extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected function casts(): array
    {
        return [
            'gallery' => 'array',
            'price' => 'integer',
            'rentalRate' => 'integer',
        ];
    }
}
