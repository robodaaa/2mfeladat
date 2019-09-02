<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header('Content-Type: text/html; charset=utf-8');

include_once('./classes/Database.php');
include_once('./classes/Address.php');

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$database = new Database();

echo json_encode($database->getAddress($id)); 
