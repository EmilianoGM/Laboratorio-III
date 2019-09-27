<?php
if(isset($_SESSION) && $_SESSION["usuario"] == "ok"){

} else{
    header("location=login.php");
}
/*
incluir en admin.php
checkear si existe en session la variable usuario y el valor "ok"
sino redirigir a login.php


onload --> funcion con ajax que llame a verficacion.php --> verificar como valor
si el usuario no esta loggeado redirecciono a login.php
si el verificar es ok cargo el listado
*/
?>