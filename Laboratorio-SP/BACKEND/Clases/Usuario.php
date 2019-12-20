<?php
require_once 'AutentificadorJWT.php';

class Usuario
{
    public $id;
    public $correo;
    public $clave;
    public $nombre;
    public $apellido;
    public $perfil;
    public $foto;

    public function __construct($id = null, $correo = "", $clave = "", $nombre = "", $apellido = "", $perfil = "empleado", $foto = "")
    {
        $this->id = $id;
        $this->correo = $correo;
        $this->clave = $clave;
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->perfil = $perfil;
        $this->foto = $foto;
    }

    public function AgregarDB(){
        $retorno = false;
        try{
            $objetoPDO = new PDO("mysql:host=localhost;dbname=concesionaria_bd;charset=utf8", "root", "");
        
            $consulta = $objetoPDO->prepare("INSERT INTO usuarios(correo, clave, nombre, apellido, perfil, foto)" .
            "VALUES (:correo,:clave,:nombre,:apellido,:perfil,:foto)");
            $consulta->bindValue(':correo', $this->correo, PDO::PARAM_STR);
            $consulta->bindValue(':clave', $this->clave, PDO::PARAM_STR);
            $consulta->bindValue(':nombre', $this->nombre, PDO::PARAM_STR);
            $consulta->bindValue(':apellido', $this->apellido, PDO::PARAM_STR);
            $consulta->bindValue(':perfil', $this->perfil, PDO::PARAM_STR);
            $consulta->bindValue(':foto', $this->foto, PDO::PARAM_STR);
            $retorno = $consulta->execute();
            $objetoPDO = null;

        } catch(PDOException $error){
            echo "<br>DB<br>";
            var_dump($error);
            return false;
        }
        return $retorno;
    }

    public static function TraerDB(){
        $objetoPDO;
        $usuarios = array();
        try{
            $objetoPDO = new PDO("mysql:host=localhost;dbname=concesionaria_bd;charset=utf8", "root", "");
        } catch(PDOException $error){
            return $error;
        }
        $consulta = $objetoPDO->prepare("SELECT * FROM usuarios");
        $consulta->execute();
        $usuarios = $consulta->fetchAll(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, "Usuario");
        return $usuarios;
    }

    public function ExisteDB(){
        $retorno = false;
        try{
            $objetoPDO = new PDO("mysql:host=localhost;dbname=concesionaria_bd;charset=utf8", "root", "");
            
            $consulta = $objetoPDO->prepare("SELECT * FROM usuarios WHERE correo = :correo AND clave = :clave");
            $consulta->bindValue(':correo', $this->correo, PDO::PARAM_STR);
            $consulta->bindValue(':clave', $this->clave, PDO::PARAM_STR);
            $consulta->execute();
            $resultado = $consulta->fetch(PDO::FETCH_ASSOC);
            if(!(empty($resultado))){
                $retorno = $resultado;
            }
            $objetoPDO = null;
        } catch(PDOException $error){
            return false;
        }
        return $retorno;
    }

    public static function AltaUsuario($request, $response, $args)
    {
        $objRetorno = new stdClass();
        $objRetorno->Exito = false;
        $objRetorno->Mensaje = "Fallo al agregar";
        $datos = $request->getParsedBody();
        $datosJSON = json_decode($datos['usuario']);
        $usuario = new Usuario(null, $datosJSON->correo, $datosJSON->clave, $datosJSON->nombre, $datosJSON->apellido, $datosJSON->perfil);
        if($usuario->ExisteDB == false){
            $archivos = $request->getUploadedFiles();
            $destino="./fotos/";
            $nombreAnterior=$archivos['foto']->getClientFilename();
            $extension= explode(".", $nombreAnterior)  ;
            //var_dump($nombreAnterior);
            $extension=array_reverse($extension);
            $pathFoto = $destino.$usuario->nombre.".". date("his") .".".$extension[0];
            $archivos['foto']->moveTo($pathFoto);
            $usuario->foto = $pathFoto;
        
            if($usuario->AgregarDB()){
                $objRetorno->Exito = true;
                $objRetorno->Mensaje = "Agregado";
            }
        } else {
            $objRetorno->Mensaje = "El usuario ya existe";
        }
        
        return $response->withJson($objRetorno, 200); 
    }

    public static function TraerUsuarios($request, $response, $args){
        $objRetorno = new stdClass();
        $objRetorno->Exito = true;
        $objRetorno->Mensaje = "Lista de usuarios";
        $objRetorno->Listado = Usuario::TraerDB();
        return $response->withJson($objRetorno, 200);
    }

    public static function TablaUsuarios($request, $response, $args){
        $objRetorno = new stdClass();
        $objRetorno->Exito = true;
        $objRetorno->Mensaje = "OK";
        $tabla = "<table border='1'>
                <tr><td>Id</td><td>Correo</td><td>Clave</td><td>Nombre</td><td>Apellido</td><td>Perfil</td><td>Foto</td></tr>
        ";
        $usuarios = Usuario::TraerDB();
        foreach ($usuarios as $usuario) {
            $tabla .= "<tr>
            <tr><td>". $usuario->id. "</td>
            <td>". $usuario->correo ."</td>
            <td>".$usuario->clave."</td>
            <td>".$usuario->nombre."</td>
            <td>".$usuario->apellido."</td>
            <td>".$usuario->perfil."</td>
            <td><img src='". $usuario->foto."' alt='Sin imagen' height='100' width='100'></td>
            </tr>
            ";
        }
        $objRetorno->tabla = $tabla;
        //$respuesta = $response->withJson($objRetorno, 200);
        return $response->withJson($objRetorno, 200);
        //$response->getBody()->write(json_encode($objRetorno));
        //$response->getBody()->write($tabla);
        //return $response;/*->withHeader('Content-Type', 'application/json');*/
    }

    public static function LoginJWT($request, $response, $args){
        $objRetorno = new stdClass();
        $objRetorno->Exito = false;
        $objRetorno->Mensaje = "Fallo";
        $objRetorno->jwt = null;
        $datos = $request->getParsedBody();
        $datosJSON = json_decode($datos['usuario']);
        $usuario = new Usuario(null, $datosJSON->correo, $datosJSON->clave);
        $usuarioDB = $usuario->ExisteDB();
        
        if($usuarioDB != false){
            $objDatosUsuario = new stdClass();
            $objDatosUsuario->correo = $usuarioDB["correo"];
            $objDatosUsuario->nombre = $usuarioDB["nombre"];
            $objDatosUsuario->apellido = $usuarioDB["apellido"];
            $objDatosUsuario->perfil = $usuarioDB["perfil"];
            $jwt = AutentificadorJWT::CrearToken($objDatosUsuario);
            $objRetorno->Jwt = $jwt;
            $objRetorno->Mensaje = "Encontrado";
            $objRetorno->Exito = true;
        }

        return $response->withJson($objRetorno, 200);
    }

    public static function DatosUsuarioJWT($request, $response, $args){
        $objRetorno = new stdClass();
        $objRetorno->Exito = false;
        $objRetorno->Mensaje = "Fallo";
        $objRetorno->Usuario = false;
        $datos = $request->getParsedBody();
        $datosJSON = json_decode($datos['usuarioJWT']);
        try{
            $usuario = AutentificadorJWT::ObtenerData($datosJSON->jwt);
            $objRetorno->Exito = true;
            $objRetorno->Mensaje = "Jwt OK";
            $objRetorno->Usuario = $usuario;
        } catch (Exception $e) {
            $objRetorno->Mensaje = "Autentificador JWT invalido";
        }
        return $response->withJson($objRetorno, 200);
    }

    public static function VerificarJWT($request, $response, $args){
        $objRetorno = new stdClass();
        $objRetorno->Exito = false;
        $objRetorno->Mensaje = "Fallo";
        $datosJWT = $request->getParam('jwt');
        try{
            AutentificadorJWT::VerificarToken($datosJWT);
            $objRetorno->Exito = true;
            $objRetorno->Mensaje = "Jwt valido";
            return $response->withJson($objRetorno, 200);
        } catch (Exception $e) {
            //var_dump($e);
            return $response->withJson($objRetorno, 403);
        }
    }

}