<?php 

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;

class UserController extends Controller{

  private function jwt( $pay ){
    return JWT::encode( $pay, env( "JWT_KEY") );
  }

  private function decode_jwt( $jwt ){

    return JWT::decode( $jwt,  env("JWT_KEY"), array("HS256") );
    
  }

  public function login( Request $request ){
    
    $user = User::where('email', $request->input('email'))->first();

    if ( !$user || $user->password !== $request->input("password")){
      return response()->json(array("error" => "Email o contraseña incorrecta. Intente nuevamente"));
    }   

    return response()->json(array("token" => $this->jwt( $user->id ) ) );
  }

  public function showDecode( Request $request ){

    
  }
  
  
}