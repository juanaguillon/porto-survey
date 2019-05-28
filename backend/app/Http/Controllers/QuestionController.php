<?php

/**
 * Este archivo será el controlador para manejar los datos desde cliente, para guardar las preguntas creadas.
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon as Carbon;
use App\QuestionModel as Question;
use Illuminate\Support\Facades\Mail;

class QuestionController extends Controller
{

	public function create(Request $request)
	{

		try {

			$theRequest = $request->all();
			unset($theRequest["alert_type"]);
			unset($theRequest["questions"]);
			unset($theRequest["show_alert"]);
			unset($theRequest["text_alert"]);
			/** Obtener las preguntas estáticas */

			$staticQuestions = array_slice($theRequest, 0, 7);

			/** Obtener las preguntas dinámicas, en teoria, las preguntas estructuradas que están guardadas en la base de datos. */
			$dynamicQuestions = array_slice($theRequest, 7);

			$dataToSave = $staticQuestions;
			$dataToSave["data_encuest"] = json_encode($dynamicQuestions);

			$dataToSave["created_at"] = Carbon::now('America/Bogota')->toDateTimeString();
			$dataToSave["updated_at"] = Carbon::now('America/Bogota')->toDateTimeString();

			/** Obtener el valor si se ha guardado satisfactoriamente. */
			$dataSaved = Question::insert($dataToSave);


			$data = array(
				"name" => $dataToSave["full_name"],
				"lastname" => $dataToSave["full_lastname"],
				"email" => $dataToSave["full_email"],
				"phone" => $dataToSave["full_phone"],
				"place_reside" => $dataToSave["full_address"],
				"red_come"     => $dataToSave["full_medio"],
				"rating"     => $dataToSave["rating"]
			);
			
			Mail::send("emails.welcome", $data, function( $message ){

				$message->from('juanaguilloncar@gmail.com');
				$message->to("miloca.98@hotmail.com")->subject('Nueva encuesta registrada');
				
			} );
			
			return response()->json($dataSaved);
		} catch (\Throwable $th) {
			return response()->json(array(
				"message" => $th->getMessage(),
				"line" => $th->getLine(),
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
