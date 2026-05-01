<?php

declare(strict_types=1);

namespace Heatforge\Controllers;

use Heatforge\DataLoader;

class CartController extends BaseController
{
    public function index(array $params = []): void
    {
        // Корзина управляется Alpine.js + localStorage на фронте.
        // PHP только рендерит пустой shell страницы.
        $accessories = array_values(array_filter(
            DataLoader::products(),
            fn($p) => $p['category'] === 'accessory'
        ));

        $this->render('pages/cart.twig', [
            'title'       => 'Корзина — HeatForge',
            'description' => 'Ваша корзина заказов.',
            'page'        => 'cart',
            'cross_sell'  => array_slice($accessories, 0, 3),
        ]);
    }
}
