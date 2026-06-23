<?php

use App\Http\Controllers\Api\CatalogController;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\AdminCatalogController;
use App\Http\Controllers\Api\RequestController;
use Illuminate\Support\Facades\Route;

Route::get('/health', fn () => [
    'status' => 'ok',
    'app' => config('app.name'),
]);

Route::get('/catalog', [CatalogController::class, 'catalog']);
Route::get('/bikes', [CatalogController::class, 'bikes']);
Route::get('/bikes/{id}', [CatalogController::class, 'bike']);
Route::get('/gear', [CatalogController::class, 'gear']);
Route::get('/rides', [CatalogController::class, 'rides']);
Route::get('/blogs', [CatalogController::class, 'blogs']);
Route::get('/blogs/{id}', [CatalogController::class, 'blog']);
Route::get('/pages', [CatalogController::class, 'pages']);
Route::get('/pages/{id}', [CatalogController::class, 'page']);

Route::post('/contact-requests', [RequestController::class, 'contact']);
Route::post('/rental-requests', [RequestController::class, 'rental']);
Route::post('/ride-requests', [RequestController::class, 'ride']);

Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::post('/admin/uploads', [AdminCatalogController::class, 'upload']);
Route::get('/admin/{resource}', [AdminCatalogController::class, 'index']);
Route::post('/admin/{resource}', [AdminCatalogController::class, 'store']);
Route::put('/admin/{resource}/{id}', [AdminCatalogController::class, 'update']);
Route::delete('/admin/{resource}/{id}', [AdminCatalogController::class, 'destroy']);
