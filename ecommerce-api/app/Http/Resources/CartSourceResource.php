<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CartSourceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $data = [
            "id" => $this->id,
            "user_id" => $this->user_id,
            "user" => $this->client ? [
                "id" => $this->client->id,
                "name" => $this->client->name,
                "email" => $this->client->email,
            ] : null,
            "product_id" => $this->product_id,
            "type_discount" => $this->type_discount,
            "discount" => $this->discount,
            "quantity" => $this->quantity,
            "cprice" => $this->cprice,
        ];
    
        // 'product' özelliği için ayrı bir null kontrolü yapmalısınız
        if ($this->product) {
            $data['product'] = [
                "id" => $this->product->id,
                "title" => $this->product->title,
                "price_dsc" => $this->product->price_dsc,
                "price_usd" => $this->product->price_usd,
                "images" => env("APP_URL") . "/storage/" . $this->product->images,
            ];
        } else {
            $data['product'] = null;
        }
    
        return $data;
    }
    
}