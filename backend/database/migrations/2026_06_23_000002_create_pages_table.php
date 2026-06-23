<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('title');
            $table->string('path')->unique();
            $table->string('seoTitle')->nullable();
            $table->text('seoDescription')->nullable();
            $table->text('heroImage')->nullable();
            $table->boolean('isPublished')->default(true);
            $table->json('content')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
