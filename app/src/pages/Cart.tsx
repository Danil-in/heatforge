import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/cart';
import QuantitySelector from '@/components/QuantitySelector';
import { Trash2, ChevronLeft, ShoppingCart, ShieldCheck, Truck, Clock, Phone } from 'lucide-react';
import { products } from '@/data/products';

const MirIcon = () => (
  <svg viewBox="0 0 60 24" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="24" rx="4" fill="#0F5CA9"/>
    <text x="30" y="16" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">МИР</text>
  </svg>
);

const SberPayIcon = () => (
  <svg viewBox="0 0 80 24" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="80" height="24" rx="4" fill="#21A038"/>
    <text x="40" y="16" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">SberPay</text>
  </svg>
);

const TPayIcon = () => (
  <svg viewBox="0 0 60 24" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="24" rx="4" fill="#FFDD2D"/>
    <text x="30" y="16" textAnchor="middle" fill="#333" fontSize="9" fontWeight="bold" fontFamily="sans-serif">T-Pay</text>
  </svg>
);

const VisaIcon = () => (
  <svg viewBox="0 0 60 24" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="24" rx="4" fill="#1A1F71"/>
    <text x="30" y="16" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="serif" fontStyle="italic">VISA</text>
  </svg>
);

const McIcon = () => (
  <svg viewBox="0 0 60 24" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="24" rx="4" fill="#252525"/>
    <circle cx="22" cy="12" r="8" fill="#EB001B"/>
    <circle cx="38" cy="12" r="8" fill="#F79E1B"/>
    <path d="M30 6.3a8 8 0 0 1 0 11.4A8 8 0 0 1 30 6.3z" fill="#FF5F00"/>
  </svg>
);

const crossSellProducts = products.filter(p => p.category === 'accessory').slice(0, 3);

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const addItem = useCartStore((s) => s.addItem);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const cartIds = items.map(i => i.id);

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-12">
        <h1 className="text-white font-bold text-3xl">
          Корзина{' '}
          <span className="text-[var(--smoke)] text-xl font-normal">
            ({items.length} {items.length === 1 ? 'товар' : items.length < 5 ? 'товара' : 'товаров'})
          </span>
        </h1>
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-[var(--copper)] hover:text-[var(--copper-light)] mt-2">
          <ChevronLeft className="w-4 h-4" />
          Вернуться в каталог
        </Link>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] mt-8">
            <ShoppingCart className="w-20 h-20 text-[var(--charcoal-surface)]" />
            <h2 className="text-white font-semibold text-xl mt-6">Ваша корзина пуста</h2>
            <p className="text-[var(--ash)] mt-2">Добавьте товары из каталога, чтобы оформить заказ</p>
            <Link to="/" className="mt-6 bg-gradient-fire text-white font-semibold px-8 py-3.5 rounded-lg shadow-fire hover:brightness-115 transition-all">
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8 flex flex-col lg:flex-row gap-8">
              <div className="flex-1 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-[var(--charcoal-panel)] rounded-xl p-4 border border-white/[0.04] flex gap-4 items-center">
                    <Link to={`/product/${item.id}`}>
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-contain bg-[var(--charcoal-surface)] border border-[var(--charcoal-surface)]" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.id}`} className="text-white font-semibold text-sm hover:text-[var(--copper)] transition-colors truncate block">
                        {item.name}
                      </Link>
                      <p className="text-xs text-[var(--smoke)] mt-1">{item.price.toLocaleString('ru-RU')} ₽ / шт.</p>
                    </div>
                    <QuantitySelector quantity={item.quantity} onChange={(q) => updateQuantity(item.id, q)} size="sm" />
                    <span className="text-[var(--flame-orange)] font-bold text-base min-w-[80px] text-right">
                      {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                    </span>
                    <button onClick={() => removeItem(item.id)} className="p-2 text-[var(--smoke)] hover:text-red-500 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}

                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[
                    { icon: ShieldCheck, text: 'Гарантия 2 года' },
                    { icon: Truck, text: 'СДЭК · ПЭК · Почта РФ' },
                    { icon: Clock, text: 'Отправка за 1–2 дня' },
                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 bg-[var(--charcoal-panel)] rounded-xl p-4 border border-white/[0.04] text-center">
                      <Icon className="w-5 h-5 text-[var(--flame-orange)]" />
                      <span className="text-xs text-[var(--ash)]">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-[320px] flex-shrink-0">
                <div className="bg-[var(--charcoal-panel)] rounded-xl p-6 border border-white/[0.04] lg:sticky lg:top-28">
                  <h3 className="text-white font-bold text-lg mb-4">Сводка заказа</h3>
                  <div className="space-y-3 pb-4 border-b border-[var(--charcoal-surface)]">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--ash)]">Товары ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                      <span className="text-white font-semibold">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--smoke)]">Доставка</span>
                      <span className="text-[var(--smoke)]">от 290 ₽</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t-2 border-[var(--flame-orange)] mt-4">
                    <span className="text-white font-semibold text-lg">Итого</span>
                    <span className="text-[var(--flame-orange)] font-bold text-2xl">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <Link to="/checkout" className="block w-full text-center bg-gradient-fire text-white font-semibold py-4 rounded-lg shadow-fire hover:brightness-115 transition-all mt-6">
                    Оформить заказ
                  </Link>
                  <Link to="/" className="block text-center text-sm text-[var(--smoke)] hover:text-white mt-4 transition-colors">
                    Продолжить покупки
                  </Link>
                  <div className="mt-6 pt-5 border-t border-[var(--charcoal-surface)]">
                    <p className="text-xs text-[var(--smoke)] text-center mb-3 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-green-500" />
                      Безопасная оплата
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <MirIcon /><SberPayIcon /><TPayIcon /><VisaIcon /><McIcon />
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[var(--charcoal-surface)]">
                    <p className="text-xs text-[var(--smoke)] text-center mb-2">Доставляем через</p>
                    <div className="flex gap-3 justify-center flex-wrap">
                      {['СДЭК', 'ПЭК', 'Почта России'].map((d) => (
                        <span key={d} className="text-xs text-[var(--ash)] bg-[var(--charcoal-surface)] px-3 py-1 rounded-full">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <a href="https://wa.me/79001234567" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 mt-4 bg-[var(--charcoal-panel)] border border-white/[0.04] rounded-xl p-4 hover:border-[var(--flame-orange)]/30 transition-colors">
                  <Phone className="w-5 h-5 text-[#25D366] flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-semibold">Есть вопрос по заказу?</p>
                    <p className="text-xs text-[var(--smoke)]">Напишите в WhatsApp — ответим за 10 минут</p>
                  </div>
                </a>
              </div>
            </div>

            {crossSellProducts.filter(p => !cartIds.includes(p.id)).length > 0 && (
              <div className="mt-12">
                <h3 className="text-white font-bold text-lg mb-6">С этим товаром часто берут</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {crossSellProducts.filter(p => !cartIds.includes(p.id)).map((product) => (
                    <div key={product.id} className="bg-[var(--charcoal-panel)] rounded-xl border border-white/[0.04] overflow-hidden flex flex-col">
                      <Link to={`/product/${product.slug}`} className="block p-4">
                        <img src={product.images[0]} alt={product.name} className="w-full h-28 object-contain" />
                        <p className="text-white font-semibold text-sm mt-3 line-clamp-2">{product.name}</p>
                        <p className="text-[var(--flame-orange)] font-bold text-base mt-1">{product.price.toLocaleString('ru-RU')} ₽</p>
                      </Link>
                      <div className="px-4 pb-4 mt-auto">
                        <button
                          onClick={() => addItem({ id: product.id, name: product.name, price: product.price, oldPrice: product.oldPrice, image: product.images[0] }, 1)}
                          className="w-full text-sm font-semibold text-[var(--flame-orange)] border border-[var(--flame-orange)] py-2 rounded-lg hover:bg-[var(--flame-orange)] hover:text-white transition-all"
                        >
                          + В корзину
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
