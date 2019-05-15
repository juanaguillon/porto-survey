<?php 

namespace Database\Models;

use Illuminate\Database\Eloquent\Model;

class QuestionStructureModel extends Model{

  protected $fillable = [
    "id",
    "text_field",
    "type_field"
  ];
  
}