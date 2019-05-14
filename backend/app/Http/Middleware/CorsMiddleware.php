<?php
namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
  public function handle($requestm, Closure $next)
  {
    $headers = [
      'Access-Control-Allow-Origin'      => 'http://localhost:3000',
      'Access-Control-Allow-Methods'     => 'POST, GET, OPTIONS, PUT, DELETE ',
      'Access-Control-Allow-Credentials' => 'true',
      'Access-Control-Max-Age'           => '86400',
      'Access-Control-Allow-Headers'     => 'Content-Type, Authorization, X-Requested-With'
    ];
    if ($requestm->isMethod('OPTIONS')) {
      return response()->json('{"method":"OPTIONS"}', 200, $headers);
    }
    $response = $next($requestm);
    foreach ($headers as $key => $value) {
      $response->header($key, $value);
    }
    return $response;
  }
}
