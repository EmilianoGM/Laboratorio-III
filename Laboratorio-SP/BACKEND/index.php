<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once './CLASES/Usuario.php';
require_once './CLASES/Auto.php';
require_once './CLASES/AutentificadorJWT.php';
require_once './CLASES/MW.php';
//require_once './CLASES/MiddleWare.php';

require_once './vendor/autoload.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);

$app->get('/usuarios', \Usuario::class . '::TraerUsuarios');

$app->post('/usuarios', \Usuario::class . '::AltaUsuario');

$app->post('/login', \Usuario::class . '::LoginJWT');

$app->post('/usuarioJWT', \Usuario::class . '::DatosUsuarioJWT');

//$app->get('/login', \Usuario::class . '::VerificarJWT');



$app->get('/autos', \Auto::class . '::TraerAutos');

$app->post('/autos', \Auto::class . '::AltaAuto');

$app->delete('/autos', \Auto::class . '::EliminarAuto');

$app->put('/autos', \Auto::class . '::ModificarAuto');

//$app->put('/autos', \Auto::class . '::ModificarAuto')->add(\MiddleWare::class . "::VerificarPerfilEncargado")->add(\MiddleWare::class . "::VerificarJWT");

//$app->delete('/autos', \Auto::class . '::EliminarAuto')->add(\MiddleWare::class . "::VerificarPerfilPropietario")->add(\MiddleWare::class . "::VerificarJWT");

$app->run();

?>