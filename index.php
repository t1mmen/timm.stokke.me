<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);
include_once('./lib/utils.php');
require_once('./vendor/autoload.php');


$app = new \Slim\Slim(array(
	'view' => '\Slim\LayoutView',
	'layout' => 'layout.php',
    'templates.path' => './views',
    'debug' => true,
));

$app->get('/', function () use ($app) {
    $app->render('main.php'); // <-- SUCCESS
});

$app->run();
?>

