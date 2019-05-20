<?php

/**
 * Este archivo será el controlador para manejar los datos desde cliente, para guardar las preguntas creadas.
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon as Carbon;
use App\QuestionModel as Question;

class QuestionController extends Controller
{

	public function create(Request $request)
	{

		try {


			/** Obtener las preguntas estáticas */
			$staticQuestions = array_slice($request->all(), 0, 6);

			/** Obtener las preguntas dinámicas, en teoria, las preguntas estructuradas que están guardadas en la base de datos. */
			$dynamicQuestions = array_slice($request->all(), 6);

			$dataToSave = $staticQuestions;
			$dataToSave["data_encuest"] = json_encode($dynamicQuestions);

			$dataToSave["created_at"] = Carbon::now()->toDateTimeString();
			$dataToSave["updated_at"] = Carbon::now()->toDateTimeString();

			/** Obtener el valor si se ha guardado satisfactoriamente. */
			$dataSaved = Question::insert( $dataToSave );

			return response()->json( $dataSaved );
		} catch (\Throwable $th) {
			return response()->json(array(
				"message" => $th->getMessage(), 
				"line"=> $th->getLine(),
				"file" => $th->getFile(),
				"code" => $th->getCode()
			));
		}
	}

	public function getAll()
	{

		return response()->json(Question::all());
	}
}