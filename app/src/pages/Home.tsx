import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/cart';
import { toast } from 'react-toastify';
import { products } from '@/data/products';
import { testimonials } from '@/data/testimonials';
import ProductCard from '@/components/ProductCard';
import SectionHeader from '@/components/SectionHeader';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Check, Star, ChevronDown, Flame, Truck, ShieldCheck, Hammer, Phone } from 'lucide-react';

export default function Home() {
  const [filter, setFilter] = useState<'all' | 'grill' | 'accessory'>('all');
  const addItem = useCartStore((s) => s.addItem);
  useScrollReveal();

  const heroProduct = products[0];

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  const handleAddHero = () => {
    addItem({
      id: heroProduct.id,
      name: heroProduct.name,
      price: heroProduct.price,
      oldPrice: heroProduct.oldPrice,
      image: heroProduct.images[0],
    }, 1);
    toast.success(`${heroProduct.name} добавлен в корзину!`);
  };

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[100dvh] flex items-center">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 w-full py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 items-center">
            {/* Product Image */}
            <div className="relative reveal flex items-center justify-center order-1 lg:order-1">
              <div className="relative w-[80%] lg:w-[90%]">
                {heroProduct.badge && (
                  <span className="absolute top-2 left-2 z-10 bg-gradient-ember text-white text-[10px] font-bold px-3 py-1 rounded uppercase flex items-center gap-1">
                    <Flame className="w-3 h-3" /> Бестселлер
                  </span>
                )}
                <img
                  src={heroProduct.images[0]}
                  alt={heroProduct.name}
                  className="w-full max-h-[65vh] object-contain glow-orange"
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-2 lg:order-2">
              <h1 
                className="reveal reveal-delay-2 text-white font-bold leading-[1.1]"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', textShadow: '0 0 40px rgba(242,106,46,0.2)' }}
              >
                {heroProduct.name}
              </h1>
              <p className="reveal reveal-delay-3 text-lg text-[var(--ash)] mt-4 max-w-[480px] leading-relaxed">
                {heroProduct.description}
              </p>

              {/* Features */}
              <div className="reveal reveal-delay-4 grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                {heroProduct.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[var(--flame-orange)] flex-shrink-0" />
                    <span className="text-sm text-[var(--smoke)]">{f}</span>
                  </div>
                ))}
              </div>

              {/* Price & CTA */}
              <div className="reveal reveal-delay-5 mt-8">
                <span className="text-[var(--flame-orange)] font-bold text-2xl">
                  {heroProduct.price.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <div className="reveal reveal-delay-6 flex flex-wrap items-center gap-4 mt-4">
                <button 
                  onClick={handleAddHero}
                  className="bg-gradient-fire text-white font-semibold px-8 py-4 rounded-lg shadow-fire hover:brightness-115 hover:shadow-fire-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Добавить в корзину
                </button>
                <a href="#products" className="text-sm text-[var(--copper)] hover:text-[var(--copper-light)] transition-colors">
                  Смотреть все модели →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
          <ChevronDown className="w-6 h-6 text-[var(--smoke)]" />
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-20 bg-[var(--charcoal)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: '/assets/cat-grills.jpg', label: 'Грили и мангалы', count: '6 моделей', href: '#products' },
              { img: '/assets/cat-accessories.jpg', label: 'Аксессуары для гриля', count: '10 товаров', href: '#products' },
              { img: '/assets/cat-recipes.jpg', label: 'Рецепты для гриля', count: '4 рецепта', href: '/blog' },
            ].map((cat, i) => (
              <Link
                key={i}
                to={cat.href}
                onClick={(e) => {
                  if (cat.href === '#products') {
                    e.preventDefault();
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="reveal group relative overflow-hidden rounded-2xl aspect-[16/9] cursor-pointer"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <img src={cat.img} alt={cat.label} className="w-full h-full object-cover transition-transform duration-500 ease-smelt group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-white font-bold text-lg md:text-xl">{cat.label}</span>
                  <p className="text-sm text-[var(--smoke)] mt-1">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section id="products" className="py-24 bg-[var(--charcoal)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeader
            overline="КАТАЛОГ"
            title="Наши изделия"
            subtitle="Ручная работа из стали толщиной 2–4 мм. Каждый мангал — уникален."
            centered
          />

          {/* Filter Tabs */}
          <div className="reveal flex justify-center gap-2 mt-12">
            {[
              { key: 'all' as const, label: 'Все' },
              { key: 'grill' as const, label: 'Грили' },
              { key: 'accessory' as const, label: 'Аксессуары' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  filter === tab.key
                    ? 'bg-[var(--flame-orange)] text-white'
                    : 'text-[var(--smoke)] hover:bg-[var(--charcoal-surface)] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            {filteredProducts.map((product, i) => (
              <div key={product.id} className="reveal" style={{ transitionDelay: `${Math.min(i * 80, 600)}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-[var(--smoke)] mt-8">
            Показано {filteredProducts.length} из {products.length} товаров
          </p>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-20 bg-[var(--charcoal-panel)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeader overline="ПОЧЕМУ МЫ" title="Кузница, которой доверяют" centered />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
            {[
              { icon: Hammer, title: 'Ручная работа', desc: 'Каждый мангал собран вручную в нашей мастерской. Контроль качества на каждом этапе.' },
              { icon: ShieldCheck, title: 'Сталь 2–4 мм', desc: 'Используем только качественную конструкционную сталь. Наши мангалы не прогорают и не деформируются.' },
              { icon: Truck, title: 'Доставка по всей России', desc: 'Отправляем ТК СДЭК и ПЭК. Упаковка из дерева и картона защищает гриль при транспортировке.' },
              { icon: ShieldCheck, title: 'Гарантия 2 года', desc: 'Уверены в качестве на 100%. Если что-то пошло не так — бесплатно починим или заменим.' },
            ].map((feat, i) => (
              <div key={i} className="reveal text-center" style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="inline-flex">
                  <feat.icon className="w-12 h-12 text-[var(--flame-orange)]" style={{ filter: 'drop-shadow(0 0 20px rgba(242,106,46,0.3))' }} />
                </div>
                <h3 className="text-white font-semibold text-lg mt-4">{feat.title}</h3>
                <p className="text-[var(--ash)] text-sm mt-2 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW TO ORDER ===== */}
      <section className="py-20 bg-[var(--charcoal)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeader overline="КАК ЗАКАЗАТЬ" title="4 шага до идеального шашлыка" centered />

          <div className="mt-14">
            {/* Timeline - Desktop */}
            <div className="hidden md:block relative">
              <div className="absolute top-6 left-[12.5%] right-[12.5%] h-[1px] bg-[var(--charcoal-surface)]" />
              <div className="grid grid-cols-4 gap-8">
                {[
                  { num: '1', title: 'Выберите модель', desc: 'Ознакомьтесь с каталогом и выберите подходящий гриль или аксессуары.' },
                  { num: '2', title: 'Оформите заказ', desc: 'Заполните простую форму с контактными данными и адресом доставки.' },
                  { num: '3', title: 'Мы доставим', desc: 'Упакуем и отправим ваш заказ транспортной компанией в течение 1–2 дней.' },
                  { num: '4', title: 'Наслаждайтесь', desc: 'Получите гриль, разведите огонь и приготовьте лучший шашлык в компании!' },
                ].map((step, i) => (
                  <div key={i} className="reveal flex flex-col items-center text-center" style={{ transitionDelay: `${i * 200}ms` }}>
                    <div className="w-12 h-12 rounded-full bg-[var(--flame-orange)] text-white font-bold text-lg flex items-center justify-center relative z-10">
                      {step.num}
                    </div>
                    <h3 className="text-white font-semibold text-base mt-4">{step.title}</h3>
                    <p className="text-[var(--ash)] text-sm mt-2 max-w-[200px]">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline - Mobile */}
            <div className="md:hidden space-y-8 relative pl-8">
              <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-[var(--charcoal-surface)]" />
              {[
                { num: '1', title: 'Выберите модель', desc: 'Ознакомьтесь с каталогом и выберите подходящий гриль или аксессуары.' },
                { num: '2', title: 'Оформите заказ', desc: 'Заполните простую форму с контактными данными и адресом доставки.' },
                { num: '3', title: 'Мы доставим', desc: 'Упакуем и отправим ваш заказ транспортной компанией в течение 1–2 дней.' },
                { num: '4', title: 'Наслаждайтесь', desc: 'Получите гриль, разведите огонь и приготовьте лучший шашлык!' },
              ].map((step, i) => (
                <div key={i} className="reveal flex gap-4" style={{ transitionDelay: `${i * 200}ms` }}>
                  <div className="w-10 h-10 rounded-full bg-[var(--flame-orange)] text-white font-bold flex items-center justify-center flex-shrink-0 relative z-10">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{step.title}</h3>
                    <p className="text-[var(--ash)] text-sm mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 bg-[var(--charcoal-panel)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeader overline="ОТЗЫВЫ" title="Что говорят наши клиенты" centered className="mb-12" />

          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={24}
            navigation
            pagination={{ clickable: true }}
            loop
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="bg-[var(--charcoal)] rounded-xl p-6 border border-white/[0.04] h-full">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-fire flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{t.name}</h4>
                      <p className="text-sm text-[var(--smoke)]">{t.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mt-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-[var(--amber)] fill-[var(--amber)]" />
                    ))}
                  </div>
                  <p className="text-[var(--ash)] text-sm mt-4 leading-relaxed italic">"{t.text}"</p>
                  <p className="text-xs text-[var(--smoke)] mt-4">{t.date}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ===== WHATSAPP CTA ===== */}
      <section className="py-20 bg-gradient-to-b from-[var(--charcoal)] to-[var(--charcoal-panel)]">
        <div className="max-w-[600px] mx-auto px-4 text-center">
          <div className="reveal">
            <div className="inline-block animate-pulse-glow rounded-full">
              <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center">
                <Phone className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <h2 className="reveal reveal-delay-1 text-white font-bold text-2xl md:text-3xl mt-8">
            Остались вопросы?
          </h2>
          <p className="reveal reveal-delay-2 text-[var(--ash)] text-lg mt-4">
            Напишите нам в WhatsApp — поможем выбрать идеальную модель, расскажем о доставке и ответим на любые вопросы. Обычно отвечаем за 10 минут.
          </p>
          <div className="reveal reveal-delay-3 mt-10">
            <WhatsAppButton />
          </div>
          <p className="reveal reveal-delay-4 text-sm text-[var(--smoke)] mt-6">
            Или позвоните: <a href="tel:+79001234567" className="text-[var(--copper)] hover:text-[var(--copper-light)]">+7 (900) 123-45-67</a>
          </p>
        </div>
      </section>
    </div>
  );
}
