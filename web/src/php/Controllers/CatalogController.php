<?php

declare(strict_types=1);

namespace Heatforge\Controllers;

use Heatforge\DataLoader;

class CatalogController extends BaseController
{
    public function index(array $params = []): void
    {
        $products = DataLoader::products();
        $category = $_GET['category'] ?? 'all';

        $filtered = $category !== 'all'
            ? array_values(array_filter($products, fn($p) => $p['category'] === $category))
            : array_values($products);

        $this->render('pages/catalog.twig', [
            'title'      => 'Каталог — HeatForge',
            'description'=> 'Грили и мангалы ручной работы. Сталь 2–4 мм, гарантия 2 года.',
            'page'       => 'catalog',
            'products'   => $filtered,
            'category'   => $category,
        ]);
    }
}
