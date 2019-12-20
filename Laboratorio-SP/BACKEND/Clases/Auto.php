<?php
require_once './CLASES/Usuario.php';

class Auto
{
    public $id;
    public $color;
    public $marca;
    public $precio;
    public $modelo;


    public function __construct($id = null, $color = "", $marca = "", $precio = 0, $modelo = "")
    {
        $this->id = $id;
        $this->color = $color;
        $this->marca = $marca;
        $this->precio = $precio;
        $this->modelo = $modelo;
    }

    public function AgregarDB(){
        $retorno = false;
        try{
            $objetoPDO = new PDO("mysql:host=localhost;dbname=concesionaria_bd;charset=utf8", "root", "");
        
            $consulta = $objetoPDO->prepare("INSERT INTO autos(color, marca, precio, modelo)" .
            "VALUES (:color,:marca,:precio,:modelo)");
            $consulta->bindValue(':color', $this->color, PDO::PARAM_STR);
            $consulta->bindValue(':marca', $this->marca, PDO::PARAM_STR);
            $consulta->bindValue(':precio', $this->precio, PDO::PARAM_INT);
            $consulta->bindValue(':modelo', $this->modelo, PDO::PARAM_STR);
            $retorno = $consulta->execute();
            $objetoPDO = null;
        } catch(PDOException $error){
            return false;
        }
        return $retorno;
    }

    public static function ExisteDB($idABuscar){
        $retorno = false;
        try{
            $objetoPDO = new PDO("mysql:host=localhost;dbname=concesionaria_bd;charset=utf8", "root", "");
            
            $consulta = $objetoPDO->prepare("SELECT * FROM autos WHERE id = :id");
            $consulta->bindValue(':id', $idABuscar, PDO::PARAM_INT);
            $consulta->execute();
            $resultado = $consulta->fetch();
            $retorno = !(empty($resultado));
            $objetoPDO = null;
        } catch(PDOException $error){
            return false;
        }
        return $retorno;
    }


    public static function AltaAuto($request, $response, $args)
    {
        $objRetorno = new stdClass();
        $objRetorno->Exito = false;
        $objRetorno->Mensaje = "Fallo al agregar";
        
        $datos = $request->getParsedBody();
        $datosJSON = json_decode($datos['auto']);
        $auto = new Auto(null,$datosJSON->color, $datosJSON->marca, $datosJSON->precio, $datosJSON->modelo);
        
        if($auto->AgregarDB()){
            $objRetorno->Exito = true;
            $objRetorno->Mensaje = "Agregado";
        }

        return $response->withJson($objRetorno, 200); 
    }

    public static function TraerDB(){
        $objetoPDO;
        $autos = array();
        try{
            $objetoPDO = new PDO("mysql:host=localhost;dbname=concesionaria_bd;charset=utf8", "root", "");
        } catch(PDOException $error){
            return $error;
        }
        $consulta = $objetoPDO->prepare("SELECT * FROM autos");
        $consulta->execute();
        $autos = $consulta->fetchAll(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, "Auto");
        return $autos;
    }

    public static function EliminarDB($idABuscar){
        $retorno = false;
        if(Auto::ExisteDB($idABuscar)){
            try{
                $objetoPDO = new PDO("mysql:host=localhost;dbname=concesionaria_bd;charset=utf8", "root", "");                      
                $consulta = $objetoPDO->prepare("DELETE FROM autos WHERE id = :id");
                $consulta->bindValue(':id', $idABuscar, PDO::PARAM_INT);
                $consulta->execute();
                $count = $consulta->rowCount();
                if($count != '0'){
                    $retorno = true;
                }
                $objetoPDO = null;
            } catch(PDOException $error){
                var_dump($error);
                return false;
            }
        }
        return $retorno;
    }

    public function ModificarDB($idABuscar){
        $retorno = false;
        try{
            $objetoPDO = new PDO("mysql:host=localhost;dbname=concesionaria_bd;charset=utf8", "root", "");
            
            $consulta = $objetoPDO->prepare("UPDATE autos SET color = :color, marca = :marca, precio = :precio, modelo = :modelo WHERE id = :id");
            $consulta->bindValue(':color', $this->color, PDO::PARAM_STR);
            $consulta->bindValue(':marca', $this->marca, PDO::PARAM_STR);
            $consulta->bindValue(':precio', $this->precio, PDO::PARAM_INT);
            $consulta->bindValue(':modelo', $this->modelo, PDO::PARAM_STR);
            $consulta->bindValue(':id', $idABuscar, PDO::PARAM_INT);
            $consulta->execute();
            $count = $consulta->rowCount();
            if($count > 0){
                $retorno = true;
            }
            $objetoPDO = null;
        } catch(PDOException $error){
            return false;
        }
        return $retorno;
    }
    
    public static function TraerAutos($request, $response, $args){
        $objRetorno = new stdClass();
        $objRetorno->Exito = true;
        $objRetorno->Mensaje = "Lista de autos";
        $objRetorno->Listado = Auto::TraerDB();
        return $response->withJson($objRetorno, 200);
    }

    public static function TablaAutos($request, $response, $args){
        $objRetorno = new stdClass();
        $objRetorno->Exito = true;
        $objRetorno->Mensaje = "OK";
        $tabla = "<table border='1'>
                <tr><td>Id</td><td>Color</td><td>Marca</td><td>Precio</td><td>Modelo</td></tr>";
        $autos = Auto::TraerDB();
        foreach ($autos as $auto) {
            $tabla .= "<tr>
            <tr><td>". $auto->id. "</td>
            <td>". $auto->color ."</td>
            <td>".$auto->marca."</td>
            <td>".$auto->precio."</td>
            <td>".$auto->modelo."</td>
            </tr>
            ";
        }
        $objRetorno->tabla = $tabla;
        //$respuesta = $response->withJson($objRetorno, 200);
        return $response->withJson($objRetorno, 200);
        //$response->getBody()->write(json_encode($objRetorno));
        //$response->getBody()->write($tabla);
        //return $response; 
    }

    public static function EliminarAuto($request, $response, $args)
    {
        $objRetorno = new stdClass();
        $objRetorno->Exito = false;
        $objRetorno->Mensaje = "Fallo al eliminar";
        
        $datos = $request->getParsedBody();
        $id_auto = (int)$datos['id_auto'];
        if(Auto::ExisteDB($id_auto)){
            if(Auto::EliminarDB($id_auto)){
                $objRetorno->Exito = true;
                $objRetorno->Mensaje = "Auto eliminado";
            }
        } else{
            $objRetorno->Mensaje = "Id no encontrado";
        }
        return $response->withJson($objRetorno, 200); 
    }

    public static function ModificarAuto($request, $response, $args)
    {
        $objRetorno = new stdClass();
        $objRetorno->Exito = false;
        $objRetorno->Mensaje = "Fallo al modificar";
        
        $datos = $request->getParsedBody();
        $datosJSON = json_decode($datos['auto']);
        $id_auto = $datosJSON->id;
        if(Auto::ExisteDB($id_auto)){
            $auto = new Auto(null,$datosJSON->color, $datosJSON->marca, $datosJSON->precio, $datosJSON->modelo);
            if($auto->ModificarDB($id_auto)){
                $objRetorno->Exito = true;
                $objRetorno->Mensaje = "Modificado";
            }
        } else{
            $objRetorno->Mensaje = "Auto no encontrado";
        }

        return $response->withJson($objRetorno, 200); 
    }
}