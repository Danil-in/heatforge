<?php

declare(strict_types=1);

namespace Heatforge;

class Router
{
    private array $routes = [
        '/'                    => ['controller' => 'HomeController',    'action' => 'index'],
        '/catalog'             => ['controller' => 'CatalogController', 'action' => 'index'],
        '/product/{slug}'      => ['controller' => 'ProductController', 'action' => 'show'],
        '/cart'                => ['controller' => 'CartController',    'action' => 'index'],
        '/checkout'            => ['controller' => 'CheckoutController','action' => 'index'],
        '/blog'                => ['controller' => 'BlogController',    'action' => 'index'],
        '/blog/{slug}'         => ['controller' => 'BlogController',    'action' => 'show'],
        '/about'               => ['controller' => 'PageController',    'action' => 'about'],
        '/contacts'            => ['controller' => 'PageController',    'action' => 'contacts'],
    ];

    public function dispatch(): void
    {
        $uri = $this->getUri();
        $matched = $this->match($uri);

        if ($matched === null) {
            $this->notFound();
            return;
        }

        [$route, $params] = $matched;
        $controllerClass = 'Heatforge\\Controllers\\' . $route['controller'];
        $action = $route['action'];

        if (!class_exists($controllerClass)) {
            $this->notFound();
            return;
        }

        $controller = new $controllerClass();
        $controller->$action($params);
    }

    private function getUri(): string
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        return rtrim($uri, '/') ?: '/';
    }

    private function match(string $uri): ?array
    {
        foreach ($this->routes as $pattern => $route) {
            $regex = $this->patternToRegex($pattern);
            if (preg_match($regex, $uri, $matches)) {
                $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
                return [$route, $params];
            }
        }
        return null;
    }

    private function patternToRegex(string $pattern): string
    {
        $regex = preg_replace('/\\{([a-z_]+)\\}/', '(?P<$1>[^/]+)', preg_quote($pattern, '#'));
        return '#^' . $regex . '$#';
    }

    private function notFound(): void
    {
        http_response_code(404);
        $renderer = new TwigRenderer();
        echo $renderer->render('pages/404.twig', ['title' => 'Страница не найдена']);
    }
}
