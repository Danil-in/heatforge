<?php

declare(strict_types=1);

namespace Heatforge\Controllers;

use Heatforge\DataLoader;

class ProductController extends BaseController
{
    public function show(array $params = []): void
    {
        $slug    = $params['slug'] ?? '';
        $product = DataLoader::productBySlug($slug);

        if ($product === null) {
            $this->notFound();
            return;
        }

        $related = DataLoader::relatedProducts($product['id'], $product['category']);

        $this->render('pages/product.twig', [
            'title'       => $product['name'] . ' — HeatForge',
            'description' => $product['description'],
            'page'        => 'product',
            'product'     => $product,
            'related'     => $related,
        ]);
    }
}
