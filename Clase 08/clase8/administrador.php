<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './vendor/autoload.php';
require_once "./usuario.php";
require_once "./AccesoDatos.php";

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);


$app->get('[/]', function (Request $request, Response $response) {    
    $response->getBody()->write("GET => Bienvenido!!! a SlimFramework");
    return $response;

});

$app->post('[/]', function (Request $request, Response $response, $args) {
    $data = $request->getParsedBody();
    $nuevaRespuesta = $response->withJson("No encontrado", 403);
    if(isset($data["usuario"])){
        $objJson = json_decode($data["usuario"]);
        $clave = $objJson->clave;
        $correo = $objJson->correo;
        $objRespuesta = Usuario::ExisteEnDB($clave, $correo);
        if($objRespuesta->Existe){
            $nuevaRespuesta = $response->withJson($objRespuesta, 200);
        }
    }
    return $nuevaRespuesta;
});

$app->run();