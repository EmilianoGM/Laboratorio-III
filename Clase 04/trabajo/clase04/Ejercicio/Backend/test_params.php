<?php
if(isset($_GET["nombre"]) && $_GET["nombre"] != "")
{
	echo "Hola ".$_GET["nombre"];
} else{
    echo ":'(";
}
?>