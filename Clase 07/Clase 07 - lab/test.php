<?php
$mensaje = isset($_POST["mensaje"]) ? $_POST["mensaje"] : NULL;
$objRetorno = new stdClass();
$objRetorno->Ok = false;

if($mensaje != NULL && isset($_FILES["archivo"])){
    $objRetorno->mensaje = $mensaje;
    $objRetorno->fecha = date("Y/m/d");
    //fotos
    $destino = "./fotos/" . date("Ymd_His") . ".jpg";
    if(move_uploaded_file($_FILES["archivo"]["tmp_name"], $destino) ){
            $objRetorno->Ok = true;
            $objRetorno->pathFoto = $destino;
    }              
}
echo json_encode($objRetorno);
?>
