<?php
$file = fopen("./autos.json", "r");
$array;
if($file != FALSE){
    $resultado = fread($file, filesize("./autos.json"));
    echo $resultado;
    fclose($file);
}
?>