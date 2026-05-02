# HeatForge — Web (PHP+Twig)

## Стек
- **Backend:** PHP 8.1+ + Twig 3
- **Frontend:** Alpine.js + SCSS
- **Сборка:** Vite 5

## Структура

```
web/
├── src/
│   ├── php/           # Router, TwigRenderer, DataLoader, Controllers
│   ├── templates/     # Twig шаблоны (layouts, pages, components)
│   ├── scss/          # SCSS (base, components, pages — per-page bundles)
│   ├── js/            # Alpine.js + vanilla JS
│   └── data/          # JSON данные (products, blog, testimonials)
├── public/            # Публичная директория (assets, build)
├── index.php          # Точка входа
├── .htaccess          # Apache rewrite rules
├── composer.json      # PHP зависимости
└── package.json       # Node зависимости
```

## Установка

```bash
# PHP зависимости
composer install

# Node зависимости + сборка
npm install
npm run build
```

## Разработка

```bash
npm run dev   # Vite dev server для SCSS/JS
```

## Деплой (Apache)
1. Настроить DocumentRoot на папку `web/`
2. Убедиться что `mod_rewrite` включён
3. Запустить `composer install --no-dev`
4. Запустить `npm run build`
5. Настроить кэш Twig: создать папку `cache/twig` с правами записи
