<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'id',
    'title',
    'path',
    'seoTitle',
    'seoDescription',
    'heroImage',
    'isPublished',
    'content',
])]
class Page extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected function casts(): array
    {
        return [
            'isPublished' => 'boolean',
            'content' => 'array',
        ];
    }
}
