<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\QuestioStructureModel as Question;
use Carbon\Carbon;



class QuestioStructureController extends Controller{

  public function create( Request $request ){

    try {
      if ($request->input("text_field") == "" || $request->input("type_field") == "") {
        return response()->json(array("error" => "Todos los campos son necesarios"));
      }

      $newQuestion = Question::create($request->all());
      if ($newQuestion) {
        return response()->json(array(
          "status" => "success",
          "last_saved" => $newQuestion
        ));
      } else {
        return response()->json(array("error" => "Error al crear una nueva estructura de pregunta"));
      } 
    } catch (\Throwable $th) {
      return response()->json(array("error" =>$th->getMessage()));
    }
    

  }

  public function getAll( ){
    $question = new Question();
    return response()->json( $question->orderBy("id","ASC")->get());
  }

  public function editStructure( Request $request ){
    $question = new Question();

    $text_field = $request->input("text_field");
    $type_field = $request->input("type_field");
    $id = $request->input("id");
    
    
    if ( ! $id ){
      return response()->json(array(
        "error" => "true",
        "message" => "No se puede buscar con el ID enviado"
      ));
    }

    if ( ! $text_field || ! $type_field ){
      return response()->json(array(
        "error" => "true",
        "message" => "Se debe enviar un el tipo y texto de la pregunta a ser editar"
      ));
    }
    
    $currentQuestion = $question->find($id);
    if ( ! $currentQuestion ){
      return response()->json(array(
        "error" => true,
        "message" => "No se ha encotrado ninguna estructura para actualizar"
      ));
    }

    $currentQuestion->text_field = $text_field;
    $currentQuestion->type_field = $type_field;

    if ($currentQuestion->save()){
      return response()->json(array(
        "error" => false,
        "message" => "Estructura actualizada correctamente."
      ));
    }else{
      return response()->json(array(
        "error" => true,
        "message" => "Error al actualizar la estructura. Intente nuevamente."
      ));
    }
    

  }
}