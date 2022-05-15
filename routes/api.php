<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CommentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Public Register Route
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


// Protected routes
Route::middleware('auth:sanctum')->group(function () {

    // Product Routes
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/product/{id}', [ProductController::class, 'show']);
    Route::get('/products/search', [ProductController::class, 'search']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::patch('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // Author Routes
    Route::get('/authors', [AuthorController::class, 'getAuthors']);

    // Book Routes
    Route::get('/books', [BookController::class, 'getBooks']);

    // Comment Routes
    Route::get('/comments', [CommentController::class, 'getComments']);

    
    // User routes
    Route::get('/profile', [AuthController::class, 'authUser']);
    Route::get('/logout', [AuthController::class, 'logout']);

});
