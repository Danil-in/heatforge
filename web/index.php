<?php

declare(strict_types=1);

define('ROOT_DIR', __DIR__);
define('SRC_DIR', ROOT_DIR . '/src');
define('DATA_DIR', SRC_DIR . '/data');
define('TEMPLATES_DIR', SRC_DIR . '/templates');

require_once ROOT_DIR . '/vendor/autoload.php';

use Heatforge\Router;

$router = new Router();
$router->dispatch();
