<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\QuestionsModel as Question;

class QuestionController extends Controller{
		
	public function create( Request $request ){
		return response()->json( $request );
	} 
}
