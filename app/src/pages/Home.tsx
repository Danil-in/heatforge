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
import {
  Check, Star, ChevronDown, Flame, Truck, ShieldCheck, Hammer, Phone,
  Clock, Award, Wrench, Package
} from 'lucide-react';

export default function Home() {
  const [filter, setFilter] = useState<'all' | 'grill' | 'accessory'>('all');
  const addItem = useCartStore((s) => s.addItem);
  useScrollReveal();

  const heroProduct = products[0];
  const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);

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
            <div className="relative reveal flex items-center justify-center order-1 lg:order-1">
              <div className="relative w-[80%] lg:w-[90%]">
                {heroProduct.badge && (
                  <span className="absolute top-2 left-2 z-10 bg-gradient-ember text-white text-[10px] font-bold px-3 py-1 rounded uppercase flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    Бестселлер
                  </span>
                )}
                <img
                  src={heroProduct.images[0]}
                  alt={heroProduct.name}
                  className="w-full max-h-[65vh] object-contain glow-orange"
                />
              </div>
            </div>
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
              <div className="reveal reveal-delay-4 grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                {heroProduct.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[var(--flame-orange)] flex-shrink-0" />
                    <span className="text-sm text-[var(--smoke)]">{f}</span>
                  </div>
                ))}
              </div>
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
              {/* Trust micro-strip под CTA */}
              <div className="reveal reveal-delay-7 flex flex-wrap gap-4 mt-6">
                {[
                  { icon: ShieldCheck, text: 'Гарантия 2 года' },
                  { icon: Truck, text: 'СДЭК · ПЭК · Почта РФ' },
                  { icon: Clock, text: 'Ответ за 10 минут' },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-[var(--smoke)]">
                    <Icon className="w-3.5 h-3.5 text-[var(--flame-orange)]" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
          <SectionHeader overline="КАТАЛОГ" title="Наши изделия" subtitle="Ручная работа из стали толщиной 2–4 мм. Каждый мангал — уникален." centered />
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

      {/* ===== WHY CHOOSE US — переработанная версия ===== */}
      <section className="py-24 bg-[var(--charcoal-panel)] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeader overline="ПОЧЕМУ МЫ" title="Сделано с огнём и душой" subtitle="Не просто мангал — инструмент мастера, который служит годами." centered />

          {/* Главные факты — горизонтальная лента */}
          <div className="reveal mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
            {[
              { value: '2019', label: 'год основания', icon: Award },
              { value: '1 200+', label: 'довольных клиентов', icon: Star },
              { value: '3–4 мм', label: 'толщина стали', icon: Hammer },
              { value: '2 года', label: 'гарантия', icon: ShieldCheck },
            ].map(({ value, label, icon: Icon }, i) => (
              <div
                key={i}
                className="reveal flex flex-col items-center justify-center text-center px-6 py-10 bg-[var(--charcoal-panel)]"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Icon className="w-7 h-7 text-[var(--flame-orange)] mb-3" style={{ filter: 'drop-shadow(0 0 12px rgba(242,106,46,0.4))' }} />
                <span className="text-white font-bold text-3xl">{value}</span>
                <span className="text-[var(--smoke)] text-sm mt-1">{label}</span>
              </div>
            ))}
          </div>

          {/* Детальные преимущества — асимметричная сетка */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Большая карточка слева */}
            <div className="reveal md:row-span-2 relative rounded-2xl bg-gradient-to-br from-[var(--charcoal-surface)] to-[var(--charcoal)] border border-white/[0.06] p-8 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--flame-orange)]/5 rounded-full -translate-y-10 translate-x-10 blur-2xl" />
              <div>
                <Hammer className="w-10 h-10 text-[var(--flame-orange)]" style={{ filter: 'drop-shadow(0 0 16px rgba(242,106,46,0.3))' }} />
                <h3 className="text-white font-bold text-xl mt-5">Ручная работа — каждый шов</h3>
                <p className="text-[var(--ash)] mt-3 leading-relaxed text-sm">
                  Каждый мангал собирается вручную в нашей мастерской в Москве. Мы не используем автоматическую сварку — только ручной труд и контроль качества на каждом этапе. Покупая HeatForge, вы получаете изделие, в которое вложены руки мастера.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-1 h-12 bg-gradient-to-b from-[var(--flame-orange)] to-transparent rounded-full" />
                <p className="text-[var(--copper)] text-sm italic">"Каждый шов — это подпись мастера"</p>
              </div>
            </div>

            {/* Две небольшие карточки справа */}
            {[
              {
                icon: ShieldCheck,
                title: 'Сталь 3–4 мм — не прогорит',
                desc: 'Конструкционная сталь толщиной 3–4 мм выдерживает годы интенсивного использования. Никакого тонкого металла — только надёжность.',
              },
              {
                icon: Truck,
                title: 'Доставка по всей России',
                desc: 'Отправляем через СДЭК, ПЭК и Почту России. Деревянная упаковка защищает гриль при транспортировке. Отслеживание онлайн.',
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="reveal rounded-2xl bg-[var(--charcoal-surface)] border border-white/[0.06] p-6 flex gap-5 items-start"
                style={{ transitionDelay: `${(i + 1) * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--flame-orange)]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-[var(--flame-orange)]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base">{title}</h3>
                  <p className="text-[var(--ash)] text-sm mt-2 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Дополнительная строка преимуществ */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Award, title: 'Гарантия 2 года', desc: 'Уверены в качестве на 100%. Если что-то не так — бесплатно починим или заменим.' },
              { icon: Package, title: 'Надёжная упаковка', desc: 'Деревянный каркас и мультислойный картон. Гриль доедет целым, что бы ни случилось в пути.' },
              { icon: Wrench, title: 'Сервис и запчасти', desc: 'Любую деталь можно заказать отдельно. Ваш мангал прослужит десятилетия.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="reveal rounded-2xl bg-[var(--charcoal-surface)] border border-white/[0.06] p-6"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <Icon className="w-8 h-8 text-[var(--flame-orange)] mb-4" />
                <h3 className="text-white font-semibold text-base">{title}</h3>
                <p className="text-[var(--ash)] text-sm mt-2 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW TO ORDER — переработанная версия ===== */}
      <section className="py-24 bg-[var(--charcoal)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeader overline="КАК ЗАКАЗАТЬ" title="От выбора до костра — 4 шага" subtitle="Мы сделали заказ максимально простым. Никаких лишних шагов." centered />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                icon: Package,
                title: 'Выберите модель',
                desc: 'Ознакомьтесь с каталогом. Не знаете что выбрать — напишите нам, подберём вариант под ваш бюджет и задачи.',
                cta: null,
              },
              {
                num: '02',
                icon: Phone,
                title: 'Оформите заказ',
                desc: 'Добавьте товар в корзину и заполните форму. Или просто напишите в WhatsApp — оформим за вас.',
                cta: null,
              },
              {
                num: '03',
                icon: Truck,
                title: 'Мы доставим',
                desc: 'Упакуем в деревянный каркас и отправим через СДЭК, ПЭК или Почту РФ в течение 1–2 рабочих дней.',
                cta: null,
              },
              {
                num: '04',
                icon: Flame,
                title: 'Разводите огонь!',
                desc: 'Получите гриль, соберите за 5 минут и приготовьте первый шашлык. Мы уверены — вы останетесь довольны.',
                cta: null,
              },
            ].map((step, i) => (
              <div
                key={i}
                className="reveal relative rounded-2xl border border-white/[0.06] overflow-hidden"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Номер-фон */}
                <div className="absolute top-4 right-4 text-[5rem] font-black text-white/[0.03] leading-none select-none">{step.num}</div>

                <div className="relative p-7">
                  {/* Иконка в круге */}
                  <div className="w-12 h-12 rounded-xl bg-[var(--flame-orange)]/10 border border-[var(--flame-orange)]/20 flex items-center justify-center mb-5">
                    <step.icon className="w-6 h-6 text-[var(--flame-orange)]" />
                  </div>

                  {/* Номер шага */}
                  <span className="text-xs font-bold text-[var(--flame-orange)] tracking-widest uppercase">Шаг {step.num}</span>

                  <h3 className="text-white font-bold text-lg mt-2">{step.title}</h3>
                  <p className="text-[var(--ash)] text-sm mt-3 leading-relaxed">{step.desc}</p>
                </div>

                {/* Разделитель-стрелка между шагами (кроме последнего) */}
                {i < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-[var(--charcoal)] border border-[var(--flame-orange)]/30 flex items-center justify-center">
                      <span className="text-[var(--flame-orange)] text-xs">→</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA под шагами */}
          <div className="reveal mt-12 text-center">
            <a
              href="#products"
              onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 bg-gradient-fire text-white font-semibold px-8 py-4 rounded-lg shadow-fire hover:brightness-115 transition-all"
            >
              <Flame className="w-5 h-5" />
              Выбрать мангал
            </a>
            <p className="text-[var(--smoke)] text-sm mt-4">
              Или{' '}
              <a href="https://wa.me/79001234567" target="_blank" rel="noopener noreferrer" className="text-[var(--copper)] hover:text-[var(--copper-light)]">
                напишите нам в WhatsApp
              </a>{' '}
              — поможем выбрать
            </p>
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
            Или позвоните:{' '}
            <a href="tel:+79001234567" className="text-[var(--copper)] hover:text-[var(--copper-light)]">+7 (900) 123-45-67</a>
          </p>
        </div>
      </section>
    </div>
  );
}
