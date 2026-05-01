<?php

declare(strict_types=1);

namespace Heatforge\Controllers;

use Heatforge\DataLoader;

class BlogController extends BaseController
{
    public function index(array $params = []): void
    {
        $posts = DataLoader::blog();

        $this->render('pages/blog.twig', [
            'title'       => 'Блог — HeatForge',
            'description' => 'Рецепты для гриля, советы по приготовлению и уходу за мангалом.',
            'page'        => 'blog',
            'posts'       => $posts,
        ]);
    }

    public function show(array $params = []): void
    {
        $slug = $params['slug'] ?? '';
        $post = DataLoader::blogPostBySlug($slug);

        if ($post === null) {
            $this->notFound();
            return;
        }

        $related = array_slice(
            array_filter(DataLoader::blog(), fn($p) => $p['slug'] !== $slug),
            0, 3
        );

        $this->render('pages/blog-post.twig', [
            'title'       => $post['title'] . ' — HeatForge',
            'description' => $post['excerpt'],
            'page'        => 'blog-post',
            'post'        => $post,
            'related'     => array_values($related),
        ]);
    }
}
