<?php

namespace App\Http\Controllers;

use App\Models\AddressUser;
use Illuminate\Http\Request;

class AdressUserController extends  Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        
        $userId = $request->input('user_id'); 

        $address = AddressUser::where("user_id", $userId)->orderBy("id", "desc")->get();
        return response()->json([
            "address"=> $address
        ]);
    }

    
    public function store(Request $request)
    {
      
        $userId = $request->input('user_id'); 

        $data = $request->all();
        $data['user_id'] = $userId;

        $address = AddressUser::create($data);
        return response()->json([
            "message" => 200,
            "address" => $address
        ]);
    }

    
    public function show(Request $request, string $id)
    {
        
        $userId = $request->input('user_id'); 

        $address = AddressUser::where("id", $id)->where("user_id", $userId)->first();

        if (!$address) {
            return response()->json(["message" => "Address not found"], 404);
        }

        return response()->json([
            "address" => $address
        ]);
    }


    public function update(Request $request, string $id)
    {
        
        $userId = $request->input('user_id'); 

        $address = AddressUser::where("id", $id)->where("user_id", $userId)->first();

        if (!$address) {
            return response()->json(["message" => "Address not found"], 404);
        }

        $address->update($request->all());

        return response()->json([
            "message" => 200,
            "address" => $address
        ]);
    }

   
    public function destroy(Request $request, string $id)
    {
       
        $userId = $request->input('user_id'); 

        $address = AddressUser::where("id", $id)->where("user_id", $userId)->first();

        if (!$address) {
            return response()->json(["message" => "Address not found"], 404);
        }

        $address->delete();

        return response()->json([
            "message" => 200
        ]);
    }
}