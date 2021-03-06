<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
	return $router->app->version();
});

$router->group(["prefix" => "user"], function () use ($router) {
	$router->post('/login', "UserController@login");
});

$router->group(["prefix" => "structure"], function () use ($router) {
	$router->post('/create', "QuestioStructureController@create");
	$router->get('/all', "QuestioStructureController@getAll");
	$router->post('/edit', "QuestioStructureController@editStructure");
});

$router->group(["prefix" => "question"], function ( ) use ( $router ){
	$router->post('/create', "QuestionController@create");
	$router->get('/all', "QuestionController@getAll");
});