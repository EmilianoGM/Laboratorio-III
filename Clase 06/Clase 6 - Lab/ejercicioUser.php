<?php

$accion = isset($_POST['accion']) ? $_POST['accion'] : NULL;
$id = isset($_POST['id']) ? $_POST['id'] : NULL;
$estado = isset($_POST['estado']) ? $_POST['estado'] : NULL;
$tabla = "<table><tr><td>Id</td><td>Nombre</td><td>Apellido</td><td>Clave</td><td>Perfil</td><td>Estado</td></tr>";
try{
    $connectionPDO = new PDO("mysql:host=localhost;dbname=mercado;charset=utf8", "root", "");
    switch($accion){
        case "traerId":
            $sentencia = $connectionPDO->prepare("SELECT * FROM usuarios WHERE id = :id");
            $sentencia->bindParam(':id', $id, PDO::PARAM_INT);
            $sentencia->execute();
            while($fila = $sentencia->fetch()){
                $tabla .= "<tr><td>" . $fila["id"] . "</td><td>" . $fila["nombre"] .
                "</td><td>" . $fila["apellido"] . "</td><td>" . $fila["clave"] . "</td><td>" .
                $fila["perfil"] . "</td><td>" .  $fila["estado"] . "</td></tr>";
                //var_dump($fila);
            }
            $tabla .= "</tabla>";
            echo $tabla;
            //var_dump($array);
            break;
        case "traerEstado":
            $sentencia = $connectionPDO->prepare("SELECT * FROM usuarios WHERE estado = :estado");
            $sentencia->bindParam(':estado', $estado, PDO::PARAM_INT);
            $sentencia->execute();
            while($fila = $sentencia->fetch()){
                $tabla .= "<tr><td>" . $fila["id"] . "</td><td>" . $fila["nombre"] .
                "</td><td>" . $fila["apellido"] . "</td><td>" . $fila["clave"] . "</td><td>" .
                $fila["perfil"] . "</td><td>" .  $fila["estado"] . "</td></tr>";
                //var_dump($fila);
            }
            $tabla .= "</tabla>";
            echo $tabla;
        break;
        //------------------------Clase LAB----------------------
        case "login":
            
        break;
        default:
            echo "error";
        break;
    }
    /*
    $result = $connectionPDO->query("SELECT * FROM cds");
    $array = $result->fetchAll();
    var_dump($array);*/
}
catch(PDOException $e){
    echo $e->getMessage();
}
?>