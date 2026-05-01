import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/cart';
import { Check, Loader2 } from 'lucide-react';

interface CustomerData {
  name: string;
  phone: string;
  email: string;
  comment: string;
}

interface DeliveryData {
  method: string;
  city: string;
  address: string;
  postalCode: string;
}

export default function Checkout() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);

  const [step, setStep] = useState<1 | 2 | 3 | 'success'>(1);
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<CustomerData>({ name: '', phone: '', email: '', comment: '' });
  const [delivery, setDelivery] = useState<DeliveryData>({
    method: 'cdek_courier',
    city: '',
    address: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-white text-2xl font-bold">Корзина пуста</h1>
          <Link to="/" className="text-[var(--copper)] mt-4 inline-block">Вернуться в каталог</Link>
        </div>
      </div>
    );
  }

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!customer.name.trim() || customer.name.length < 3) errs.name = 'Введите ФИО (мин. 3 символа)';
    if (!customer.phone.trim()) errs.phone = 'Введите телефон';
    else if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(customer.phone)) errs.phone = 'Неверный формат телефона';
    if (!customer.email.trim()) errs.email = 'Введите email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) errs.email = 'Неверный формат email';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!delivery.city.trim()) errs.city = 'Введите город';
    if (!delivery.address.trim()) errs.address = 'Введите адрес';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(1);
    let formatted = '+7';
    if (digits.length > 0) formatted += ' (' + digits.slice(0, 3);
    if (digits.length >= 3) formatted += ')';
    if (digits.length > 3) formatted += ' ' + digits.slice(3, 6);
    if (digits.length > 6) formatted += '-' + digits.slice(6, 8);
    if (digits.length > 8) formatted += '-' + digits.slice(8, 10);
    return formatted;
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate sending via EmailJS
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setStep('success');
    clearCart();
  };

  const inputClass = (field: string) =>
    `w-full bg-[var(--charcoal-surface)] border rounded-xl px-4 py-3 text-white placeholder-[var(--smoke)] outline-none transition-colors ${
      errors[field] ? 'border-red-500' : 'border-[var(--charcoal-surface)] focus:border-[var(--copper)]'
    }`;

  // Step Indicator
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-4 mb-10">
      {[
        { num: 1, label: 'Контакты' },
        { num: 2, label: 'Доставка' },
        { num: 3, label: 'Подтверждение' },
      ].map((s, i) => {
        const isActive = step === s.num;
        const isCompleted = typeof step === 'number' && step > s.num;
        return (
          <div key={i} className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  isActive ? 'bg-[var(--flame-orange)] text-white' :
                  isCompleted ? 'bg-[var(--flame-orange)] text-white' :
                  'bg-[var(--charcoal-surface)] text-[var(--smoke)] border-2 border-[var(--charcoal-surface)]'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : s.num}
              </div>
              <span className={`text-xs mt-2 ${isActive ? 'text-white' : isCompleted ? 'text-[var(--smoke)]' : 'text-[var(--smoke)]'}`}>
                {s.label}
              </span>
            </div>
            {i < 2 && (
              <div className={`w-12 h-[2px] mb-5 ${typeof step === 'number' && step > s.num ? 'bg-[var(--flame-orange)]' : 'bg-[var(--charcoal-surface)]'}`} />
            )}
          </div>
        );
      })}
    </div>
  );

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="text-center max-w-[500px]">
          <div className="w-20 h-20 bg-[var(--flame-orange)] rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-white font-bold text-3xl mt-6">Заказ оформлен!</h1>
          <p className="text-[var(--ash)] text-lg mt-4">
            Спасибо за покупку! Наш менеджер свяжется с вами в ближайшее время для подтверждения заказа.
          </p>
          <p className="font-mono-data text-[var(--copper)] text-lg mt-6">
            #HF-2025-{Math.floor(1000 + Math.random() * 9000)}
          </p>
          <Link
            to="/"
            className="inline-block mt-8 bg-gradient-fire text-white font-semibold px-8 py-4 rounded-lg shadow-fire hover:brightness-115 transition-all"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-[700px] mx-auto px-4 sm:px-6">
        <h1 className="text-white font-bold text-3xl text-center">Оформление заказа</h1>

        <StepIndicator />

        {/* Step 1 */}
        {step === 1 && (
          <div className="bg-[var(--charcoal-panel)] rounded-2xl p-6 sm:p-8 border border-white/[0.04]">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-white mb-1 block">ФИО *</label>
                <input
                  type="text"
                  placeholder="Иванов Иван Иванович"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className={inputClass('name')}
                />
                {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name}</span>}
              </div>

              <div>
                <label className="text-sm font-semibold text-white mb-1 block">Телефон *</label>
                <input
                  type="tel"
                  placeholder="+7 (999) 999-99-99"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: formatPhone(e.target.value) })}
                  className={inputClass('phone')}
                />
                {errors.phone && <span className="text-xs text-red-500 mt-1">{errors.phone}</span>}
              </div>

              <div>
                <label className="text-sm font-semibold text-white mb-1 block">Email *</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className={inputClass('email')}
                />
                {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email}</span>}
              </div>

              <div>
                <label className="text-sm font-semibold text-white mb-1 block">Комментарий к заказу</label>
                <textarea
                  rows={4}
                  placeholder="Особые пожелания, удобное время звонка..."
                  value={customer.comment}
                  onChange={(e) => setCustomer({ ...customer, comment: e.target.value })}
                  className={`${inputClass('comment')} resize-none`}
                />
              </div>
            </div>

            <button
              onClick={() => validateStep1() && setStep(2)}
              className="w-full bg-gradient-fire text-white font-semibold py-4 rounded-lg shadow-fire hover:brightness-115 transition-all mt-8"
            >
              Продолжить
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="bg-[var(--charcoal-panel)] rounded-2xl p-6 sm:p-8 border border-white/[0.04]">
            <div className="space-y-3 mb-6">
              {[
                { value: 'cdek_courier', label: 'СДЭК — курьер', price: 'от 500 ₽' },
                { value: 'cdek_point', label: 'СДЭК — пункт выдачи', price: 'от 350 ₽' },
                { value: 'pek', label: 'ПЭК — доставка до двери', price: 'от 700 ₽' },
              ].map((method) => (
                <label
                  key={method.value}
                  className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                    delivery.method === method.value
                      ? 'border-2 border-[var(--flame-orange)] bg-[var(--flame-orange)]/5'
                      : 'border-2 border-transparent bg-[var(--charcoal-surface)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      value={method.value}
                      checked={delivery.method === method.value}
                      onChange={(e) => setDelivery({ ...delivery, method: e.target.value })}
                      className="w-4 h-4 accent-[var(--flame-orange)]"
                    />
                    <span className="text-white text-sm font-medium">{method.label}</span>
                  </div>
                  <span className="text-sm text-[var(--smoke)]">{method.price}</span>
                </label>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-white mb-1 block">Город *</label>
                <input
                  type="text"
                  placeholder="Москва"
                  value={delivery.city}
                  onChange={(e) => setDelivery({ ...delivery, city: e.target.value })}
                  className={inputClass('city')}
                />
                {errors.city && <span className="text-xs text-red-500 mt-1">{errors.city}</span>}
              </div>

              <div>
                <label className="text-sm font-semibold text-white mb-1 block">Адрес доставки *</label>
                <textarea
                  rows={3}
                  placeholder="Улица, дом, квартира, подъезд..."
                  value={delivery.address}
                  onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
                  className={`${inputClass('address')} resize-none`}
                />
                {errors.address && <span className="text-xs text-red-500 mt-1">{errors.address}</span>}
              </div>

              <div>
                <label className="text-sm font-semibold text-white mb-1 block">Индекс</label>
                <input
                  type="text"
                  placeholder="101000"
                  value={delivery.postalCode}
                  onChange={(e) => setDelivery({ ...delivery, postalCode: e.target.value })}
                  className={inputClass('postalCode')}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border-2 border-[var(--copper)] text-[var(--copper)] font-semibold py-4 rounded-lg hover:bg-[var(--copper)] hover:text-[var(--charcoal)] transition-all"
              >
                Назад
              </button>
              <button
                onClick={() => validateStep2() && setStep(3)}
                className="flex-1 bg-gradient-fire text-white font-semibold py-4 rounded-lg shadow-fire hover:brightness-115 transition-all"
              >
                Продолжить
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="bg-[var(--charcoal-panel)] rounded-2xl p-6 sm:p-8 border border-white/[0.04]">
            {/* Customer Summary */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-semibold">Ваши данные</h3>
                <button onClick={() => setStep(1)} className="text-sm text-[var(--copper)] hover:underline">Изменить</button>
              </div>
              <div className="text-sm text-[var(--ash)] space-y-1">
                <p>Имя: {customer.name}</p>
                <p>Телефон: {customer.phone}</p>
                <p>Email: {customer.email}</p>
              </div>
            </div>

            {/* Delivery Summary */}
            <div className="mb-6 pb-6 border-b border-[var(--charcoal-surface)]">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-semibold">Доставка</h3>
                <button onClick={() => setStep(2)} className="text-sm text-[var(--copper)] hover:underline">Изменить</button>
              </div>
              <div className="text-sm text-[var(--ash)] space-y-1">
                <p>{delivery.method === 'cdek_courier' ? 'СДЭК — курьер' : delivery.method === 'cdek_point' ? 'СДЭК — пункт выдачи' : 'ПЭК — доставка до двери'}</p>
                <p>{delivery.city}, {delivery.address}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">Товары</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-contain bg-[var(--charcoal-surface)]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{item.name}</p>
                      <p className="text-xs text-[var(--smoke)]">{item.quantity} шт.</p>
                    </div>
                    <span className="text-sm text-[var(--flame-orange)] font-semibold">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 pt-4 border-t border-[var(--charcoal-surface)]">
                <span className="text-white font-semibold">Итого</span>
                <span className="text-[var(--flame-orange)] font-bold text-xl">{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            {/* Payment Notice */}
            <div className="bg-[var(--flame-orange)]/5 border-l-4 border-[var(--flame-orange)] p-4 rounded-r-lg mb-6">
              <p className="text-[var(--ash)] text-sm">
                Оплата при получении. Наш менеджер свяжется с вами для подтверждения заказа в течение 2 часов.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border-2 border-[var(--copper)] text-[var(--copper)] font-semibold py-4 rounded-lg hover:bg-[var(--copper)] hover:text-[var(--charcoal)] transition-all"
              >
                Назад
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-gradient-fire text-white font-semibold py-4 rounded-lg shadow-fire hover:brightness-115 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? 'Отправка...' : 'Подтвердить заказ'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
