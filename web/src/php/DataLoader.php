<?php

declare(strict_types=1);

namespace Heatforge;

class DataLoader
{
    private static array $cache = [];

    public static function load(string $file): array
    {
        if (isset(self::$cache[$file])) {
            return self::$cache[$file];
        }

        $path = DATA_DIR . '/' . $file . '.json';

        if (!file_exists($path)) {
            throw new \RuntimeException("Data file not found: {$path}");
        }

        $json = file_get_contents($path);
        $data = json_decode($json, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \RuntimeException("Invalid JSON in {$path}: " . json_last_error_msg());
        }

        self::$cache[$file] = $data;
        return $data;
    }

    public static function products(): array
    {
        return self::load('products');
    }

    public static function productBySlug(string $slug): ?array
    {
        $products = self::products();
        foreach ($products as $product) {
            if ($product['slug'] === $slug) {
                return $product;
            }
        }
        return null;
    }

    public static function relatedProducts(string $currentId, string $category, int $limit = 4): array
    {
        $products = self::products();
        return array_slice(
            array_filter($products, fn($p) => $p['id'] !== $currentId && $p['category'] === $category),
            0,
            $limit
        );
    }

    public static function blog(): array
    {
        return self::load('blog');
    }

    public static function blogPostBySlug(string $slug): ?array
    {
        $posts = self::blog();
        foreach ($posts as $post) {
            if ($post['slug'] === $slug) {
                return $post;
            }
        }
        return null;
    }

    public static function testimonials(): array
    {
        return self::load('testimonials');
    }

    public static function settings(): array
    {
        return self::load('settings');
    }
}
