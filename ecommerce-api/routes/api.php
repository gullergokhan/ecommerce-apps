<?php

use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Basket\BasketController;
use App\Http\Controllers\Product\CategoriesController;
use App\Http\Controllers\AdressUserController;
use App\Http\Controllers\Dashboard;
use App\Http\Controllers\Product\ProductController as ProductController;
use App\Http\Controllers\Product\ProductSizeColorController;
use App\Http\Controllers\Product\ProductImagesController;
use App\Http\Controllers\SalesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post("register",[ApiController::class,"register"]);
Route::post("login",[ApiController::class,"login"]);

Route::post("register", [ApiController::class, "register"]);
Route::post("login", [ApiController::class, "login"]);
Route::post("admin_login", [ApiController::class, "adminlogin"]);

Route::group(["middleware" => ["auth:api"]], function(){

    Route::get("profile", [ApiController::class, "profile"]);
    Route::get("refresh", [ApiController::class, "refreshToken"]);
    Route::get("logout", [ApiController::class, "logout"]);
});
Route::group(["middleware" => ["api"]], function(){

    Route::get("category/all",[CategoriesController::class,"index"]);
    Route::delete("category/{id}", [CategoriesController::class, "destroy"]);
    Route::post("category/add", [CategoriesController::class, "store"]);
    Route::post("category/update/{id}", [CategoriesController::class, "update"]);
    Route::get("category/detail/{id}", [CategoriesController::class, "getCategory"]);
});
Route::group(["middleware" => ["api"]], function(){

    Route::get("basket/cart",[BasketController::class,"index"]);
    Route::post("basket/cart/add",[BasketController::class,"store"]);
    Route::post("basket/cart/update/{id}",[BasketController::class,"update"]);
    Route::delete("basket/cart/delete/{id}",[BasketController::class,"destroy"]);

});
 
Route::group(["middleware" => ["api"]], function(){

    Route::get("basket/user/address", [AdressUserController::class, "index"]);
    Route::post("basket/user/address/add", [AdressUserController::class, "store"]);
    Route::post("basket/user/address/update/{id}", [AdressUserController::class, "update"]);
    Route::delete("basket/user/address/delete/{id}", [AdressUserController::class, "destroy"]);

});
Route::group(["middleware" => ["api"]], function(){

    Route::post("basket/checkout", [SalesController::class, "store"]);
    Route::get("basket/orders/all", [SalesController::class, "index"]);
    Route::get("basket/toptensale/all", [SalesController::class, "topten"]);
    Route::get('/basket/items/count', [BasketController::class, 'getItemCount']);

});
Route::group(["middleware" => ["api"]], function(){

    Route::get("users/latest", [Dashboard::class, "getLastUsers"]);
    Route::get("users/count", [Dashboard::class, "getUsersCount"]);
    

});


Route::group(["middleware" => ["api"]], function(){

    Route::get("product/all", [ProductController::class, "index"]);
    Route::get('/product/by-category/{categoryId}', [ProductController::class, 'getProductsByCategoryId']);

    Route::get("topfour/all", [ProductController::class, "topfour"]);

    Route::get("product/get_info", [ProductController::class, "get_info"]);
    Route::get("product/show_product/{id}", [ProductController::class, "show"]);

    Route::post("product/add", [ProductController::class, "store"]);
    Route::post("product/update/{id}", [ProductController::class, "update"]);
    Route::delete("product/delete/{id}", [ProductController::class, "destroy"]);


    Route::post("product/img/add", [ProductImagesController::class, "store"]);
    Route::delete("product/img/delete/{id}", [ProductImagesController::class, "destroy"]);

    Route::post("product/sizecolor/add", [ProductSizeColorController::class, "store"]);
    Route::delete("product/size/delete/{id}", [ProductSizeColorController::class, "destroy_size"]);
    Route::delete("product/color/delete/{id}", [ProductSizeColorController::class, "destroy"]);
    Route::get("detail/{id}", [ProductController::class, "pdetail"]);



});