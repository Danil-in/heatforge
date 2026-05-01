<?php

declare(strict_types=1);

namespace Heatforge\Controllers;

class PageController extends BaseController
{
    public function about(array $params = []): void
    {
        $this->render('pages/about.twig', [
            'title'       => 'О компании — HeatForge',
            'description' => 'Кузница огня с 2019 года. Узнайте нашу историю.',
            'page'        => 'about',
        ]);
    }

    public function contacts(array $params = []): void
    {
        $this->render('pages/contacts.twig', [
            'title'       => 'Контакты — HeatForge',
            'description' => 'Свяжитесь с нами любым удобным способом.',
            'page'        => 'contacts',
        ]);
    }
}
