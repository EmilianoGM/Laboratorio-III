<?php
$producto = isset($_POST["producto"]) ? $_POST["producto"] : NULL;
if($producto != NULL){
    $obj = json_decode($producto);
    $obj->nombre = "pepsi";
    $obj->precio = 777;
    echo json_encode($obj);
}
?>
