<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Firebase\JWT\JWT;

require_once './vendor/autoload.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;


$app = new \Slim\App(["settings" => $config]);

$app->group("/login", function() use ($app){
    $app->get('[/]', function (Request $request, Response $response) {
      $response->getBody()->write("GET => grupo credenciales");
      return $response;
    });
  
    $app->post('[/]', function (Request $request, Response $response) {
        $objRespuesta = new stdClass();
        $data = $request->getParsedBody();

        $datos = $request->getParsedBody();
        $ahora = time();
        
        $payload = array(
            'iat' => $ahora,            //CUANDO SE CREO EL JWT (OPCIONAL)
            'exp' => $ahora + (3000),     //INDICA EL TIEMPO DE VENCIMIENTO DEL JWT (OPCIONAL)
            'data' => $datos,           //DATOS DEL JWT
            'app' => "API REST 2019"    //INFO DE LA APLICACION (PROPIO)
        );
          
        //CODIFICO A JWT
        $objRespuesta->token = JWT::encode($payload, "miClaveSecreta");
        $objRespuesta->exito = true;
        return $response->withJson($objRespuesta, 200);
    });
});

$app->run();

?>
