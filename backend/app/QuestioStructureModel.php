<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuestioStructureModel extends Model{

  protected $table = "questios_structure";
  
  protected $fillable = [
    "id",
    "text_field",
    "type_field"
  ];
  
}