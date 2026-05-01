<?php

declare(strict_types=1);

namespace Heatforge\Controllers;

use Heatforge\DataLoader;

class HomeController extends BaseController
{
    public function index(array $params = []): void
    {
        $products     = DataLoader::products();
        $testimonials = DataLoader::testimonials();
        $featured     = array_filter($products, fn($p) => $p['category'] === 'grill');

        $this->render('pages/home.twig', [
            'title'        => 'HeatForge — Грили и мангалы ручной работы',
            'description'  => 'Кузница огня с 2019 года. Ручная работа — каждый шов, каждый угол.',
            'page'         => 'home',
            'hero_product' => array_values($products)[0] ?? null,
            'products'     => array_values($featured),
            'testimonials' => $testimonials,
        ]);
    }
}
