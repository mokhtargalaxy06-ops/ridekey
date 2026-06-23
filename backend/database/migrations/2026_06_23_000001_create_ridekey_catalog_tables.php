<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bikes', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->string('brand');
            $table->string('type');
            $table->integer('price')->default(0);
            $table->integer('rentalRate')->default(0);
            $table->string('engine')->nullable();
            $table->string('displacement')->nullable();
            $table->string('torque')->nullable();
            $table->string('topSpeed')->nullable();
            $table->string('power')->nullable();
            $table->string('weight')->nullable();
            $table->text('image')->nullable();
            $table->json('gallery')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('gear_items', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->string('category')->nullable();
            $table->unsignedTinyInteger('rating')->default(5);
            $table->string('price')->default('MAD 0');
            $table->integer('priceValue')->default(0);
            $table->text('image')->nullable();
            $table->text('url')->nullable();
            $table->string('cta')->nullable();
            $table->timestamps();
        });

        Schema::create('rides', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('title');
            $table->string('price')->default('MAD 0');
            $table->string('startDate')->nullable();
            $table->string('startTime')->nullable();
            $table->string('endDate')->nullable();
            $table->string('endTime')->nullable();
            $table->text('image')->nullable();
            $table->json('video')->nullable();
            $table->timestamps();
        });

        Schema::create('blogs', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('title');
            $table->string('seoTitle')->nullable();
            $table->string('date')->nullable();
            $table->date('publishedAt')->nullable();
            $table->date('updatedAt')->nullable();
            $table->string('tag')->nullable();
            $table->text('image')->nullable();
            $table->text('excerpt')->nullable();
            $table->json('keywords')->nullable();
            $table->json('sections')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blogs');
        Schema::dropIfExists('rides');
        Schema::dropIfExists('gear_items');
        Schema::dropIfExists('bikes');
    }
};
