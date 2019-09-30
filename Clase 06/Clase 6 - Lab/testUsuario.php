<?php
require_once "./usuario.php";
require_once "./AccesoDatos.php";

$user = isset($_POST["usuario"]) ? $_POST["usuario"] : NULL;
$objRetorno = new stdClass();
$objRetorno->Ok = false;
if($user != NULL){
    $obj = json_decode($user);
    $clave = $obj->clave;
    $correo = $obj->correo;
    $respuesta = Usuario::ExisteEnDB($clave, $correo);
    $objRetorno->Ok = $respuesta;
}
echo json_encode($objRetorno);
?>