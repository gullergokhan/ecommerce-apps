<?php

namespace App\Models\Cart;

use App\Models\Product\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carts extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'type_discount',
        'discount',
        'quantity',
        'cprice', 
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}