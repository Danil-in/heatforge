<?php

declare(strict_types=1);

namespace Heatforge\Controllers;

class CheckoutController extends BaseController
{
    public function index(array $params = []): void
    {
        $this->render('pages/checkout.twig', [
            'title'       => 'Оформление заказа — HeatForge',
            'description' => 'Оформите заказ быстро и удобно.',
            'page'        => 'checkout',
        ]);
    }
}
