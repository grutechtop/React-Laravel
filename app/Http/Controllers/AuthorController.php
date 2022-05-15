<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class AuthorController extends Controller
{
    public function getAuthors(): JsonResponse
    {

        $authors = Author::with('books.comments')->get();

        return response()->json([
            'message' => "Authors Successfully founded !",
            'data' => $authors

        ], ResponseAlias::HTTP_OK);

    }
}
