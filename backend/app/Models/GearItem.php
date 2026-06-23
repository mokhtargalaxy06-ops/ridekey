<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['id', 'name', 'category', 'rating', 'price', 'priceValue', 'image', 'url', 'cta'])]
class GearItem extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected function casts(): array
    {
        return [
            'rating' => 'integer',
            'priceValue' => 'integer',
        ];
    }
}
