<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'id', 'title', 'seoTitle', 'date', 'publishedAt', 'updatedAt', 'tag',
    'image', 'excerpt', 'keywords', 'sections',
])]
class Blog extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected function casts(): array
    {
        return [
            'keywords' => 'array',
            'sections' => 'array',
            'publishedAt' => 'date:Y-m-d',
            'updatedAt' => 'date:Y-m-d',
        ];
    }
}
