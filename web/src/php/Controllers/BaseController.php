<?php

declare(strict_types=1);

namespace Heatforge\Controllers;

use Heatforge\TwigRenderer;

abstract class BaseController
{
    protected TwigRenderer $renderer;

    public function __construct()
    {
        $this->renderer = new TwigRenderer();
    }

    protected function render(string $template, array $context = []): void
    {
        echo $this->renderer->render($template, $context);
    }

    protected function redirect(string $url, int $code = 302): void
    {
        http_response_code($code);
        header('Location: ' . $url);
        exit;
    }

    protected function notFound(): void
    {
        http_response_code(404);
        $this->render('pages/404.twig', ['title' => 'Страница не найдена']);
        exit;
    }
}
