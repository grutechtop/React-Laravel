<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class CommentController extends Controller
{
    public function getComments(): JsonResponse
    {
      $comments = Comment::with('book.author')->get();


        return response()->json([
            'message' => "Comments Successfully founded !",
            'data' => $comments

        ], ResponseAlias::HTTP_OK);
    }
}
