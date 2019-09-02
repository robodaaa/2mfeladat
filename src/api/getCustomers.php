<?php 
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

  include_once('./classes/Database.php');

  $database = new Database();

  echo json_encode($database->getAllUser());