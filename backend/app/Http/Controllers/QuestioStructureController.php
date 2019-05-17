<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\QuestioStructureModel as Question;


class QuestioStructureController extends Controller{

  public function create( Request $request ){

    try {
      if ($request->input("text_field") == "" || $request->input("type_field") == "") {
        return response()->json(array("error" => "Todos los campos son necesarios"));
      }

      $newQuestion = Question::create($request->all());
      if ($newQuestion) {
        return response()->json(array("status" => "success"));
      } else {
        return response()->json(array("error" => "Error al crear una nueva estructura de pregunta"));
      } 
    } catch (\Throwable $th) {
      return response()->json(array("error" =>$th->getMessage()));
    }
    

  }

  public function getAll( ){
    return response()->json( Question::all() );
  }
  
}