<?php
require_once 'AutentificadorJWT.php';
require_once './CLASES/Usuario.php';

class MiddleWare
{
    public static function VerificarJWT($request, $response, $next)
    {
        $objRetorno = new stdClass();
        $objRetorno->Exito = false;
        $objRetorno->Mensaje = "Fallo";
        $datos = $request->getParsedBody();
        $datosJWT = $datos['jwt'];
        try{
            AutentificadorJWT::VerificarToken($datosJWT);
            $objRetorno->Exito = true;
            $objRetorno->Mensaje = "Jwt valido";
            $response = $next($request, $response);
        } catch (Exception $e) {
            //var_dump($e);
            $response = $response->withJson($objRetorno, 409);
        }
        return $response;
    }
    public static function VerificarPerfilPropietario($request, $response, $next)
    {
        $objRetorno = new stdClass();
        $objRetorno->Exito = false;
        $objRetorno->Mensaje = "Fallo en usuario";

        $datos = $request->getParsedBody();
        $datosJWT = $datos['jwt'];
        $datosJSON = AutentificadorJWT::ObtenerData($datosJWT);
        if($datosJSON->perfil == "propietario"){
            $usuario = new Usuario(null, $datosJSON->correo, $datosJSON->clave, $datosJSON->nombre, $datosJSON->apellido, $datosJSON->perfil);
            if($usuario->ExisteDB()){
                $objRetorno->Exito = true;
                $response = $next($request, $response);
            } else{
                $objRetorno->Mensaje = "Usuario inexistente";
            }
        } else{
            $objRetorno->Mensaje = "No es propietario";
        }

        if(!($objRetorno->Exito)){
            $response = $response->withJson($objRetorno, 409);
        }

        return $response;
    }

    public static function VerificarPerfilEncargado($request, $response, $next)
    {
        $objRetorno = new stdClass();
        $objRetorno->Exito = false;
        $objRetorno->Mensaje = "Fallo en usuario";

        $datos = $request->getParsedBody();
        $datosJWT = $datos['jwt'];
        $datosJSON = AutentificadorJWT::ObtenerData($datosJWT);
        if($datosJSON->perfil == "propietario" || $datosJSON->perfil == "encargado"){
            $usuario = new Usuario(null, $datosJSON->correo, $datosJSON->clave, $datosJSON->nombre, $datosJSON->apellido, $datosJSON->perfil);
            if($usuario->ExisteDB()){
                $objRetorno->Exito = true;
                $response = $next($request, $response);
            } else{
                $objRetorno->Mensaje = "Usuario inexistente";
            }
        } else{
            $objRetorno->Mensaje = "No es propietario o encargado";
        }

        if(!($objRetorno->Exito)){
            $response = $response->withJson($objRetorno, 409);
        }
        
        return $response;
    }
/*
    public static function VerificarPerfilEmpleado($request, $response, $next)
    {
        $objRetorno = new stdClass();
        $objRetorno->Exito = false;
        $objRetorno->Mensaje = "Fallo en usuario";

        $datos = $request->getParsedBody();
        $datosJSON = json_decode($datos['usuario']);
        if($datosJSON->perfil == "empleado"){
            $usuario = new Usuario(null, $datosJSON->correo, $datosJSON->clave, $datosJSON->nombre, $datosJSON->apellido, $datosJSON->perfil);
            if($usuario->ExisteDB()){
                $objRetorno->Exito = true;
                $response = $next($request, $response);
            } else{
                $objRetorno->Mensaje = "Usuario inexistente";
            }
        } else{
            $objRetorno->Mensaje = "No es empleado";
        }

        if(!($objRetorno->Exito)){
            $response = $response->withJson($objRetorno, 409);
        }
        
        return $response;
    }*/
}
?>