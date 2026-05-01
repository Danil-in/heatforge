import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/cart';
import QuantitySelector from '@/components/QuantitySelector';
import { Trash2, ChevronLeft, ShoppingCart } from 'lucide-react';

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalPrice = useCartStore((s) => s.totalPrice());

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <h1 className="text-white font-bold text-3xl">
          Корзина <span className="text-[var(--smoke)] text-xl font-normal">({items.length} {items.length === 1 ? 'товар' : items.length < 5 ? 'товара' : 'товаров'})</span>
        </h1>
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-[var(--copper)] hover:text-[var(--copper-light)] mt-2">
          <ChevronLeft className="w-4 h-4" /> Вернуться в каталог
        </Link>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] mt-8">
            <ShoppingCart className="w-20 h-20 text-[var(--charcoal-surface)]" />
            <h2 className="text-white font-semibold text-xl mt-6">Ваша корзина пуста</h2>
            <p className="text-[var(--ash)] mt-2">Добавьте товары из каталога, чтобы оформить заказ</p>
            <Link
              to="/"
              className="mt-6 bg-gradient-fire text-white font-semibold px-8 py-3.5 rounded-lg shadow-fire hover:brightness-115 transition-all"
            >
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="mt-8 flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[var(--charcoal-panel)] rounded-xl p-4 border border-white/[0.04] flex gap-4 items-center"
                >
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-contain bg-[var(--charcoal-surface)] border border-[var(--charcoal-surface)]"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`} className="text-white font-semibold text-sm hover:text-[var(--copper)] transition-colors truncate block">
                      {item.name}
                    </Link>
                    <p className="text-xs text-[var(--smoke)] mt-1">
                      {item.price.toLocaleString('ru-RU')} ₽ / шт.
                    </p>
                  </div>

                  <QuantitySelector
                    quantity={item.quantity}
                    onChange={(q) => updateQuantity(item.id, q)}
                    size="sm"
                  />

                  <span className="text-[var(--flame-orange)] font-bold text-base min-w-[80px] text-right">
                    {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                  </span>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-[var(--smoke)] hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
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
                    <span className="text-[var(--smoke)]">Рассчитывается при оформлении</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t-2 border-[var(--flame-orange)] mt-4">
                  <span className="text-white font-semibold text-lg">Итого</span>
                  <span className="text-[var(--flame-orange)] font-bold text-2xl">
                    {totalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="block w-full text-center bg-gradient-fire text-white font-semibold py-4 rounded-lg shadow-fire hover:brightness-115 transition-all mt-6"
                >
                  Оформить заказ
                </Link>

                <Link
                  to="/"
                  className="block text-center text-sm text-[var(--smoke)] hover:text-white mt-4 transition-colors"
                >
                  Продолжить покупки
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
