<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use \Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Throwable;

class ProductController extends Controller
{
    /****************************************
     * Response Messages needs Headers:
     *
     * Accept -> application/json
     * Content-Type -> application/json
     * X-Requested-With -> XMLHttpRequest
     *****************************************
     */



    //Display a listing of products.
    public function index()
    {
        try {
            return Product::all();
        } catch (Throwable $err) {
            dd($err);
        }
    }

    // Create a Product
    public function store(Request $request): JsonResponse
    {

        $request->validate([
            'name' => 'required|string|max:255|unique:products',
            'description' => '|string|max:255',
            'price' => 'required'
        ]);


        $product = Product::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'price' => $request->input('price')
        ]);

        return response()->json([
            'message' => "Product Created Successfully !",
            'data' => $product
        ], ResponseAlias::HTTP_CREATED);
    }


    //Display the specified product.
    public function show($id): JsonResponse
    {
        if ($product = Product::find($id)) {
            return response()->json([
                'message' => "Product Successfully founded !",
                'data' => $product
            ], ResponseAlias::HTTP_OK);
        } else {
            return response()->json([
                'message' => "Product with id $id no Founded !",
            ], ResponseAlias::HTTP_NOT_FOUND);
        }
    }


    //Update the specified Product in storage.
    public function update(Request $request, $id): JsonResponse
    {
        if ($product = Product::find($id)) {


            $request->validate([
                'name' => 'string|max:255',
                'description' => 'string|max:255'
            ]);


            $product->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'price' => $request->input('price')
            ]);

            return response()->json([
                'message' => "Product Updated Successfully !",
                'data' => $product
            ], ResponseAlias::HTTP_CREATED);

        } else {

            return response()->json([
                'message' => "Product with id $id no Founded !",
            ], ResponseAlias::HTTP_NOT_FOUND);
        }
    }


    //Remove the specified PRODUCT from storage.
    public function destroy($id): JsonResponse
    {
        $product = Product::findOrFail($id);

        $product->delete();

        return response()->json([
            'message' => "Product Deleted Successfully !"
        ], ResponseAlias::HTTP_OK);
    }

    //Search for Product
    public function search(Request $request): JsonResponse
    {
        $name = $request->query('name');

        $product = Product::where('name', 'like', '%' . $name . '%')->get();

        return response()->json([
            'message' => "Product Successfully founded !",
            'data' => $product
        ], ResponseAlias::HTTP_OK);
    }
}
