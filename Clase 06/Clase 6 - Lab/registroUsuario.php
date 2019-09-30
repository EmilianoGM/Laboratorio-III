<?php
require_once "./usuario.php";
require_once "./AccesoDatos.php";

$user = isset($_POST["usuario"]) ? $_POST["usuario"] : NULL;
$op = isset($_POST["op"]) ? $_POST["op"] : null;

switch ($op) {

    case "subirFoto":

        $objRetorno = new stdClass();
        $objRetorno->Ok = false;

        $destino = "./fotos/" . date("Ymd_His") . ".jpg";
        if(isset($_FILES["foto"])){
            if(move_uploaded_file($_FILES["foto"]["tmp_name"], $destino) ){
                if(SubirNuevoUsuario($user, $destino)){
                    $objRetorno->Ok = true;
                }              
            }
        }       
        echo json_encode($objRetorno);
        break;

    default:
        echo "error";
        break;
}

function SubirNuevoUsuario($usuarioJSON, $path){
    $retorno = false;
    if($usuarioJSON != NULL){
        $obj = json_decode($usuarioJSON);
        $nuevoUsuario = new Usuario();
        $nuevoUsuario->nombre = $obj->nombre;
        $nuevoUsuario->apellido = $obj->apellido;
        $nuevoUsuario->clave = $obj->clave;
        $nuevoUsuario->perfil = $obj->perfil;
        $nuevoUsuario->correo = $obj->correo;
        $nuevoUsuario->estado = 1;
        $nuevoUsuario->pathFoto = $path;
        if($nuevoUsuario->NuevoUsuario() != false){
            $retorno = true;
        }
    }
    return $retorno;
}
?>