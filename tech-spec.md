# HeatForge — Техническая спецификация

## Зависимости

### Продакшен

| Пакет | Версия | Назначение |
|-------|--------|------------|
| `react` | ^19.0.0 | UI-фреймворк |
| `react-dom` | ^19.0.0 | React DOM-рендерер |
| `react-router-dom` | ^7.5.0 | Маршрутизация (HashRouter) |
| `zustand` | ^5.0.0 | Глобальное состояние корзины |
| `swiper` | ^11.2.0 | Карусели (галерея, отзывы, похожие товары) |
| `react-toastify` | ^11.0.0 | Toast-уведомления (добавление в корзину) |
| `emailjs-com` | ^3.2.0 | Отправка заказа на email |
| `geist` | ^1.3.0 | Шрифты Geist Sans + Geist Mono |

### Девелопмент

| Пакет | Версия | Назначение |
|-------|--------|------------|
| `vite` | ^6.3.0 | Сборщик |
| `@vitejs/plugin-react` | ^4.4.0 | React-плагин для Vite |
| `typescript` | ^5.8.0 | Типизация |
| `@types/react` | ^19.0.0 | Типы React |
| `@types/react-dom` | ^19.0.0 | Типы React DOM |
| `tailwindcss` | ^4.1.0 | CSS-фреймворк |
| `@tailwindcss/vite` | ^4.1.0 | Tailwind-плагин для Vite |

---

## Инвентарь компонентов

### Layout (общие, используются на всех страницах)

| Компонент | Источник | Переиспользование |
|-----------|----------|-------------------|
| EmberMatrixBackground | Кастомный (Canvas 2D) | Все страницы (фиксированный фон) |
| Header | Кастомный | Все страницы (фиксированный) |
| Footer | Кастомный | Все страницы |
| PageTransitionOverlay | Кастомный | Все страницы ( fade-оверлей при смене маршрута) |

### Секции — Home (`/`)

| Компонент | Категория |
|-----------|-----------|
| HeroSection | Секция |
| CategoriesSection | Секция |
| FeaturedProductsSection | Секция |
| WhyChooseUsSection | Секция |
| HowToOrderSection | Секция |
| TestimonialsSection | Секция |
| WhatsAppCTASection | Секция |

### Секции — Product Detail (`/product/:id`)

| Компонент | Категория |
|-----------|-----------|
| ProductHeroSection | Секция |
| ImageGallerySection | Секция |
| DetailedFeaturesSection | Секция |
| SpecificationsSection | Секция |
| VideoReviewSection | Секция |
| RelatedProductsSection | Секция |
| StickyPurchaseBar | Секция (условно-рендерится по позиции скролла) |

### Секции — Cart (`/cart`)

| Компонент | Категория |
|-----------|-----------|
| CartHeader | Секция |
| CartItems | Секция |
| CartSummary | Секция |

### Секции — Checkout (`/checkout`)

| Компонент | Категория |
|-----------|-----------|
| CheckoutHeader | Секция |
| StepIndicator | Секция |
| Step1CustomerInfo | Секция |
| Step2Delivery | Секция |
| Step3OrderReview | Секция |
| OrderSuccess | Секция (заменяет форму после отправки) |

### Секции — About (`/about`)

| Компонент | Категория |
|-----------|-----------|
| AboutHeroSection | Секция |
| OurStorySection | Секция |
| CraftsmanshipSection | Секция |
| WorkshopGallerySection | Секция |
| TrustGuaranteesSection | Секция |
| AboutCTABanner | Секция |

### Секции — Contacts (`/contacts`)

| Компонент | Категория |
|-----------|-----------|
| ContactsHeroSection | Секция |
| ContactCardsSection | Секция |
| MapSection | Секция |
| ContactsWhatsAppCTA | Секция |

### Секции — Blog List (`/blog`)

| Компонент | Категория |
|-----------|-----------|
| BlogHeroSection | Секция |
| ArticlesGridSection | Секция |
| NewsletterCTASection | Секция |

### Секции — Blog Post (`/blog/:slug`)

| Компонент | Категория |
|-----------|-----------|
| ArticleHeaderSection | Секция |
| ArticleContentSection | Секция |
| ArticleFooterSection | Секция |
| RelatedArticlesSection | Секция |

### Переиспользуемые компоненты

| Компонент | Источник | Где используется |
|-----------|----------|------------------|
| SectionHeader | Кастомный | Все страницы (overline + title + subtitle) |
| ProductCard | Кастомный | Home (каталог), RelatedProducts |
| CopperFrameButton | Кастомный | Все страницы (primary + secondary варианты) |
| CartSidebar | Кастомный | Header (drawer) |
| ToastNotifications | Кастомный (обёртка react-toastify) | Глобально |
| LoadingSkeleton | Кастомный | Home (заглушка карточек) |
| QuantitySelector | Кастомный | ProductDetail, Cart |
| ScrollReveal | Кастомный (IntersectionObserver хук + обёртка) | Все секции |
| FilterTabs | Кастомный | Home (каталог) |
| TestimonialCard | Кастомный | TestimonialsSection |
| ArticleCard | Кастомный | BlogList, RelatedArticles |
| RecipeBlock | Кастомный | BlogPost (если рецепт) |
| WhatsAppButton | Кастомный | Home, Contacts, Footer |

### Хуки

| Хук | Назначение |
|-----|------------|
| useScrollReveal | IntersectionObserver для анимаций появления секций |
| useEmberCanvas | Canvas 2D анимация фона (800 точек, 60fps) |
| useStickyPurchaseBar | Показ/скрытие sticky-бара на ProductDetail |

---

## Анимации

| Анимация | Библиотека | Подход | Сложность |
|----------|------------|--------|-----------|
| Ember matrix (800 точек, дрейф, пульсация, mouse flare) | Canvas 2D API | Кастомный хук useEmberCanvas: requestAnimationFrame + точечное обновление uniform-like данных (time, mouse, resolution). Отрисовка через fillRect для каждой точки с radial gradient. Wrap-around по краям. Reduced motion — статичное поле. | 🔒 High |
| Hero entrance sequence (homepage) | CSS transitions + setTimeout | Каскадная цепочка CSS-классов с incremental delay. Каждый элемент получает .animate класс с задержкой (300ms → 500ms → 700ms...). | Medium |
| Hero entrance sequence (product page) | CSS transitions + setTimeout | Тот же подход, другие тайминги. | Medium |
| Scroll-triggered section entrances | Кастомный хук useScrollReveal | IntersectionObserver (threshold 0.15) переключает CSS-класс .revealed. 4 паттерна: FadeUp, ScaleIn, SlideLeft, SlideRight, StaggerChildren. | Medium |
| Page transition overlay | CSS transition + React Router | Чёрный оверлей с opacity 0→1→0, длительность 300ms/400ms. Переключение маршрута в середине анимации. | Medium |
| Cart sidebar slide-in | CSS transition | translateX(100%)→0, 400ms ease-crucible. Бэкдроп opacity 0→0.5, 300ms. | Low |
| Product card hover lift | CSS transition | translateY(-4px), border-color, box-shadow. 400ms ease-crucible. | Low |
| Image hover zoom | CSS transition | scale(1.05), 600ms ease-smelt. | Low |
| CopperFrameButton hover/active | CSS transition | brightness, box-shadow, scale. | Low |
| Filter tab transitions | CSS transition + JS | Карточки fade out (200ms) → реордер → fade in (300ms, stagger 50ms). | Medium |
| Testimonial carousel | Swiper | slidesPerView адаптивный, loop, навигация стрелками + пагинация. | Low |
| Product gallery carousel | Swiper | Основной swiper + thumbs swiper. Навигация + пагинация. | Low |
| Related products carousel | Swiper | slidesPerView адаптивный, loop, навигация. | Low |
| Workshop gallery carousel | Swiper | slidesPerView адаптивный, loop, captions overlay. | Low |
| Blog list card hover | CSS transition | translateY(-6px), border-color, box-shadow. 400ms ease-crucible. | Low |
| Sticky purchase bar | CSS transition | translateY(100%)→0, 400ms. Триггер по scroll position (hero выходит из viewport). | Low |
| Checkout step transitions | CSS transition | Текущий шаг fadeOut + translateX(-20px), новый fadeIn + translateX(20px)→0, 400ms. | Medium |
| Success checkmark animation | CSS transition | Scale 0→1, 600ms ease-surge + pulsing glow box-shadow. | Low |
| WhatsApp icon pulse | CSS @keyframes | box-shadow opacity 0.3→0.6→0.3, 2s infinite. | Low |
| Scroll indicator bounce | CSS @keyframes | translateY(0→8px→0), 2s infinite. Fade out после 100px скролла. | Low |
| Toast notifications | react-toastify | Кастомные стили: фон charcoal-panel, border-left flame-orange, position bottom-right, auto-close 3s. | Low |
| Loading skeleton shimmer | CSS @keyframes | opacity 0.3→0.6→0.3, 1.5s infinite. | Low |
| Timeline line draw | CSS transition | scaleX(0→1), transform-origin left, 1200ms ease-crucible. | Low |
| Quantity change feedback | CSS transition | scale(1.2→1), 200ms ease-surge. | Low |
| Cart item removal collapse | CSS transition | height→0, opacity→0, 300ms. | Low |
| Founded badge scale-in | CSS transition | scale(0→1), 500ms ease-surge. | Low |
| Image lazy load fade | CSS transition | opacity 0→1 при onLoad, 400ms. | Low |

---

## Состояние и логика

### Zustand: Cart Store

Глобальный стор с persist-middleware (localStorage):

- `items: CartItem[]` — массив товаров в корзине
- `addItem(product, quantity)` — добавление/инкремент существующего
- `removeItem(productId)` — полное удаление
- `updateQuantity(productId, quantity)` — установка количества (1–99)
- `clearCart()` — очистка (после успешного заказа)
- `totalItems` — суммарное количество (derived)
- `totalPrice` — суммарная стоимость (derived)
- Синхронизация с Header (badge count) и CartSidebar (live content)

### Checkout: 3-Step Wizard

Локальный стейт компонента (useState):

- `step: 1 | 2 | 3 | 'success'` — текущий шаг
- `customerData: { name, phone, email, comment }` — Step 1
- `deliveryData: { method, city, address, postalCode }` — Step 2
- Валидация: phone mask +7 (XXX) XXX-XX-XX, email regexp, required fields
- Navigation: back/continue с валидацией перед переходом
- Submit: EmailJS.send() → loading → success state → clearCart() → redirect

### Product Detail: Sticky Purchase Bar

- `useStickyPurchaseBar` отслеживает пересечение hero-секции с viewport
- Бар показывается когда hero выходит из view, скрывается когда внутри
- Позиция fixed bottom, z-index 40, hidden на mobile

### Ember Matrix: Canvas 2D Loop

`useEmberCanvas` управляет:
- Инициализация canvas + контекста, resize-обработчик
- requestAnimationFrame loop: обновление time, mouse position (lerp 0.1), отрисовка
- ~800 точек: position, size, temperature, speed, seed
- Mouse interaction: точки в радиусе 15% viewport получают intensity boost + color shift
- Reduced motion: статичное поле без drift
- Cleanup: cancelAnimationFrame + removeEventListener при unmount

---

## Прочие ключевые решения

### Маршрутизация

HashRouter (не BrowserRouter), т.к. деплой — статический хостинг. Все маршруты обрабатываются клиентским роутером.

### Данные

Все продукты, посты, отзывы — статические данные в TypeScript-файлах (`src/data/`). Никакого backend API. URL-friendly slug для продуктов (транслитерация названия).

### EmailJS

Интеграция через `emailjs-com`. Template parameters: имя, телефон, email, адрес, комментарий, список товаров, итоговая сумма. Service ID / Template ID / User ID — в константах с комментарием о замене.

### Карта

Yandex Maps iframe с тёмной темой и кастомным маркером. Fallback — текст с адресом + ссылка на построение маршрута.
