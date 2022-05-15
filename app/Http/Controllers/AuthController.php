<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    /****************************************
     * Response Messages needs Headers:
     *
     * Accept -> application/json
     * Content-Type -> application/json
     * X-Requested-With -> XMLHttpRequest
     ******************************************/


    // Register New User
    public function register(Request $request): JsonResponse
    {

        $rules = [
            'name' => 'required|string|min:3|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|string|confirmed|min:6'
        ];
        $errorMessages = [
            'unique' => 'This Email is already Taken !',
            'required' => 'This Field is Required !',
            'confirmed' => "passwords don't match"
        ];

        $this->validate($request, $rules, $errorMessages);

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password'))
            // 'password' => Hash::make($request->input('password'))
        ]);

        return response()->json([
            'message' => "User with name $user->name Created Successfully !",
            'data' => $user
        ], ResponseAlias::HTTP_CREATED);
    }


    // Login Controller
    public function login(Request $request) : JsonResponse
    {
        $rules = [
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:6'
        ];
        $errorMessages = [
            'unique' => 'This Email is already Taken !',
            'required' => 'This Field is Required !'
        ];

        $this->validate($request, $rules, $errorMessages);

        if (!Auth::attempt([
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ])) {
            return response()->json(['Error message' => 'Invalid Credentials'], ResponseAlias::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();

        $token = $user->createToken('token')->plainTextToken;

        $cookie = cookie('access_token', $token, 240 * 24);  // 4 Days


        return response()->json([
            'message' => 'User Successfully Logged in !',
            'data' => $user,
            'token' => $token
        ], ResponseAlias::HTTP_OK)->withCookie($cookie);
    }


    // Logout User
    public function logout() : JsonResponse
    {
        $cookie = Cookie::forget('access_token');
        // Revoke the token that was used to authenticate the current request...
        Auth::user()->currentAccessToken()->delete();

        return response()->json([
            'data' => 'user logged out successfully',
        ], ResponseAlias::HTTP_OK)->withCookie($cookie);
    }


    // Get authenticated User
    public function authUser(): JsonResponse
    {
        return response()->json([
            'data' => Auth::user(),
        ], ResponseAlias::HTTP_OK);
    }
}
