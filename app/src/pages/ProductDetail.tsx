import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { useCartStore } from '@/store/cart';
import { toast } from 'react-toastify';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import ProductCard from '@/components/ProductCard';
import SectionHeader from '@/components/SectionHeader';
import QuantitySelector from '@/components/QuantitySelector';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Star, Truck, ChevronLeft } from 'lucide-react';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl font-bold">Товар не найден</h1>
          <Link to="/" className="text-[var(--copper)] mt-4 inline-block hover:underline">Вернуться в каталог</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id, product.category);
  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        image: product.images[0],
      },
      quantity
    );
    toast.success(`${product.name} (${quantity} шт.) добавлен в корзину!`);
  };

  const featureDetails = [
    { title: product.features[0] || '', desc: 'Продуманная конструкция для максимального удобства приготовления.' },
    { title: product.features[1] || '', desc: 'Высокая прочность и долговечность даже при интенсивном использовании.' },
    { title: product.features[2] || '', desc: 'Качественные материалы обеспечивают долгий срок службы.' },
    { title: product.features[3] || '', desc: 'Оптимальная вместимость для ваших задач.' },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section ref={heroRef} className="min-h-[90vh] flex items-center py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <Link to="/" className="reveal inline-flex items-center gap-1 text-sm text-[var(--copper)] hover:text-[var(--copper-light)] mb-6">
            <ChevronLeft className="w-4 h-4" /> Назад в каталог
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="reveal flex items-center justify-center">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-[85%] max-h-[60vh] object-contain glow-orange-lg"
              />
            </div>

            {/* Info */}
            <div>
              <span className="reveal reveal-delay-1 text-xs font-medium text-[var(--copper)] uppercase tracking-[0.1em]">
                {product.category === 'grill' ? 'Грили' : 'Аксессуары'}
              </span>
              <h1 
                className="reveal reveal-delay-2 text-white font-bold leading-[1.1] mt-2"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', textShadow: '0 0 40px rgba(242,106,46,0.15)' }}
              >
                {product.name}
              </h1>

              {/* Rating */}
              <div className="reveal reveal-delay-3 flex items-center gap-2 mt-3">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-[18px] h-[18px] text-[var(--amber)] fill-[var(--amber)]" />
                  ))}
                </div>
                <span className="text-sm text-[var(--smoke)]">5.0 (12 отзывов)</span>
              </div>

              {/* Price */}
              <div className="reveal reveal-delay-4 flex items-center gap-3 mt-6">
                <span className="text-[var(--flame-orange)] font-bold text-3xl">
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
                {product.oldPrice && (
                  <>
                    <span className="text-[var(--smoke)] line-through text-lg">
                      {product.oldPrice.toLocaleString('ru-RU')} ₽
                    </span>
                    <span className="text-xs bg-[var(--flame-orange)] text-white px-2 py-0.5 rounded">
                      Экономия {((product.oldPrice - product.price)).toLocaleString('ru-RU')} ₽
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="reveal reveal-delay-5 text-lg text-[var(--ash)] mt-4 max-w-[520px] leading-relaxed">
                {product.description}
              </p>

              {/* Key Specs */}
              <div className="reveal reveal-delay-5 flex flex-wrap gap-2 mt-6">
                {Object.entries(product.specs).slice(0, 4).map(([key, val]) => (
                  <div key={key} className="bg-[var(--charcoal-surface)] rounded-lg px-4 py-2">
                    <span className="text-xs text-[var(--smoke)] block">{key}</span>
                    <span className="text-sm text-white font-semibold">{val}</span>
                  </div>
                ))}
              </div>

              {/* Add to Cart */}
              <div className="reveal reveal-delay-6 flex items-center gap-4 mt-8">
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
                <button
                  onClick={handleAddToCart}
                  className="bg-gradient-fire text-white font-semibold px-8 py-3.5 rounded-lg shadow-fire hover:brightness-115 hover:shadow-fire-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  В корзину
                </button>
              </div>

              <div className="reveal reveal-delay-7 flex items-center gap-2 mt-4 text-xs text-[var(--smoke)]">
                <Truck className="w-4 h-4" />
                Доставка по РФ 3–10 дней
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[var(--charcoal-panel)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeader overline="ОСОБЕННОСТИ" title="Почему именно эта модель" centered />

          <div className="mt-14 space-y-16">
            {featureDetails.map((feat, i) => (
              <div
                key={i}
                className={`reveal grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:[direction:rtl] md:[&>*]:[direction:ltr]' : ''}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className={`bg-[var(--charcoal-surface)] rounded-xl aspect-video flex items-center justify-center overflow-hidden ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <img
                    src={product.images[0]}
                    alt={feat.title}
                    className="w-3/4 h-3/4 object-contain opacity-80"
                  />
                </div>
                <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                  <h3 className="text-white font-bold text-xl">{feat.title}</h3>
                  <p className="text-[var(--ash)] mt-3 leading-relaxed max-w-[440px]">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs Table */}
      <section className="py-16 bg-[var(--charcoal)]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="reveal text-white font-bold text-xl text-center mb-8">Технические характеристики</h2>
          <div className="reveal bg-[var(--charcoal-panel)] rounded-xl overflow-hidden border border-white/[0.04]">
            {Object.entries(product.specs).map(([key, val], i) => (
              <div
                key={key}
                className={`flex justify-between items-center px-6 py-4 ${
                  i < Object.entries(product.specs).length - 1 ? 'border-b border-[var(--charcoal-surface)]' : ''
                } ${i % 2 === 1 ? 'bg-white/[0.01]' : ''}`}
              >
                <span className="text-sm text-[var(--smoke)] font-semibold">{key}</span>
                <span className="text-base text-white font-medium">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Review */}
      {product.videoUrl && (
        <section className="py-16 bg-[var(--charcoal-panel)]">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-12">
            <SectionHeader overline="ВИДЕООБЗОР" title="Посмотрите гриль в действии" />
            <div className="reveal mt-8 aspect-video rounded-xl overflow-hidden border border-[var(--charcoal-surface)]">
              <iframe
                src={product.videoUrl}
                title="Видеообзор"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-[var(--charcoal)]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
            <SectionHeader overline="РЕКОМЕНДУЕМ" title="Похожие товары" centered className="mb-12" />
            <Swiper
              modules={[Navigation]}
              slidesPerView={1.5}
              spaceBetween={16}
              navigation
              loop
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {relatedProducts.map((rp) => (
                <SwiperSlide key={rp.id}>
                  <ProductCard product={rp} compact />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* Sticky Purchase Bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--charcoal-panel)]/95 backdrop-blur-xl border-t border-[var(--charcoal-surface)] hidden md:block">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-white truncate max-w-[200px]">{product.name}</span>
            <span className="text-base font-bold text-[var(--flame-orange)]">{product.price.toLocaleString('ru-RU')} ₽</span>
            <button
              onClick={handleAddToCart}
              className="bg-gradient-fire text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow-fire hover:brightness-115 transition-all"
            >
              В корзину
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
