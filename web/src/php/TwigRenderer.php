<?php

declare(strict_types=1);

namespace Heatforge;

use Twig\Environment;
use Twig\Loader\FilesystemLoader;
use Twig\TwigFunction;

class TwigRenderer
{
    private Environment $twig;

    public function __construct()
    {
        $loader = new FilesystemLoader(TEMPLATES_DIR);

        $this->twig = new Environment($loader, [
            'cache'       => ROOT_DIR . '/cache/twig',
            'auto_reload' => true,
            'debug'       => $_ENV['APP_DEBUG'] ?? false,
        ]);

        $this->registerGlobalFunctions();
        $this->registerGlobals();
    }

    public function render(string $template, array $context = []): string
    {
        return $this->twig->render($template, $context);
    }

    private function registerGlobals(): void
    {
        $this->twig->addGlobal('app', [
            'name'    => 'HeatForge',
            'year'    => date('Y'),
            'phone'   => '+7 (900) 123-45-67',
            'whatsapp'=> 'https://wa.me/79001234567',
        ]);
    }

    private function registerGlobalFunctions(): void
    {
        // asset('path') — возвращает URL к собранному ассету
        $this->twig->addFunction(new TwigFunction('asset', function (string $path): string {
            $manifest = $this->getManifest();
            $key = ltrim($path, '/');
            return '/build/' . ($manifest[$key]['file'] ?? $key);
        }));

        // dump() для отладки
        if ($_ENV['APP_DEBUG'] ?? false) {
            $this->twig->addFunction(new TwigFunction('dump', function ($var): string {
                return '<pre>' . htmlspecialchars(print_r($var, true)) . '</pre>';
            }, ['is_safe' => ['html']]));
        }
    }

    private function getManifest(): array
    {
        static $manifest = null;
        if ($manifest === null) {
            $path = ROOT_DIR . '/public/build/.vite/manifest.json';
            $manifest = file_exists($path) ? json_decode(file_get_contents($path), true) : [];
        }
        return $manifest;
    }
}
