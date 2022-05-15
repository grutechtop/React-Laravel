<?php

namespace App\Http\Controllers;
use App\Models\Book;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class BookController extends Controller
{
    public function getBooks(): JsonResponse
    {
        $books = Book::with(['author', 'comments'])->get();

        return response()->json([
            'message' => "Books Successfully founded !",
            'data' => $books

        ], ResponseAlias::HTTP_OK);
    }
}
