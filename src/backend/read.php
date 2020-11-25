<?php
/**
 * Returns the list of cpu names
 */
require 'database.php';

$sql_query = [];
$sql = "SELECT Number, Pokemon, Type1, Type2, HP, Attack, Defense, Speed, Special, GIF, PNG, Description FROM db";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $sql_query[$i]['num']    = intval($row['Number']);
    $sql_query[$i]['pokemon']    = $row['Pokemon'];
    $sql_query[$i]['type1']    = $row['Type1'];
    $sql_query[$i]['type2']    = $row['Type2'];
    $sql_query[$i]['hp']    = intval($row['HP']);
    $sql_query[$i]['attack']    = intval($row['Attack']);
    $sql_query[$i]['defense']    = intval($row['Defense']);
    $sql_query[$i]['speed']    = intval($row['Speed']);
    $sql_query[$i]['special']    = intval($row['Special']);
    $sql_query[$i]['gif']    = $row['GIF'];
    $sql_query[$i]['png']    = $row['PNG'];
    $sql_query[$i]['desc']    = $row['Description'];
    $i++;
  }

  echo json_encode($sql_query);
}
else
{
  http_response_code(404);
}