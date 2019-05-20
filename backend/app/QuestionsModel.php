<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuestionModel extends Model{

  protected $casts = [
    "data_encuest" => "array"
  ];

  protected $table = "questions";
  
}