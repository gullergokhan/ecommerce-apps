<?php

namespace App\Http\Controllers\Basket;

use App\Http\Controllers\Controller;
use App\Http\Resources\CartSourceCollection;
use App\Models\Cart\Carts;
use App\Models\Carts as ModelsCarts;
use App\Models\Product\Product;
use Illuminate\Http\Request;

class BasketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $carts = Carts::all();
        return response()->json(["carts" => CartSourceCollection::make($carts)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    { $product = Product::findOrFail($request->product_id);
        if($product->stock < $request->quantity)
        {
            return response()->json(["message"=>403,
                          "message_text"=>" Product quantitiy error 2"]);
        }
        $carts = Carts::create($request->all());
        return response()->json(["message" => 200, "cart" => $carts]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
   
   { $carts = Carts::findOrFail($id);
    $carts->update($request->all());
    return response()->json(["message" => 200, "cart" => $carts]);}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $carts = Carts::findOrFail($id);
        $carts->delete();
        return response()->json(["message" => 200]);
    }
}
