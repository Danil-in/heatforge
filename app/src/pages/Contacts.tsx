import { useScrollReveal } from '@/hooks/useScrollReveal';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Contacts() {
  useScrollReveal();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="pt-20 pb-12 text-center px-4">
        <span className="reveal text-xs font-medium text-[var(--flame-orange)] uppercase tracking-[0.15em]">КОНТАКТЫ</span>
        <h1 className="reveal reveal-delay-1 text-white font-bold text-4xl mt-3">Свяжитесь с нами</h1>
        <p className="reveal reveal-delay-2 text-lg text-[var(--ash)] mt-4 max-w-[600px] mx-auto">
          Ответим на любые вопросы о наших грилях, доставке и гарантии. Обычно отвечаем за 10 минут.
        </p>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-[var(--charcoal-panel)]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: Phone,
                label: 'Телефон',
                value: '+7 (900) 123-45-67',
                note: 'Пн–Пт 9:00–20:00, Сб 10:00–18:00',
                action: { type: 'tel', text: 'Позвонить', href: 'tel:+79001234567' },
              },
              {
                icon: MessageCircle,
                label: 'WhatsApp',
                value: '+7 (900) 123-45-67',
                note: 'Отвечаем в течение 10 минут',
                action: { type: 'wa', text: 'Написать', href: 'https://wa.me/79001234567?text=Здравствуйте! Интересует продукция HeatForge' },
              },
              {
                icon: Mail,
                label: 'Email',
                value: 'info@heatforge.ru',
                note: 'Отвечаем в течение 24 часов',
                action: { type: 'email', text: 'Написать', href: 'mailto:info@heatforge.ru' },
              },
              {
                icon: MapPin,
                label: 'Адрес',
                value: 'г. Москва, ул. Кузнецкая, 15, стр. 2',
                note: 'Мастерская и шоурум',
                action: null,
              },
            ].map((card, i) => (
              <div key={i} className="reveal bg-[var(--charcoal)] rounded-xl p-6 border border-white/[0.04]" style={{ transitionDelay: `${i * 100}ms` }}>
                <card.icon className={`w-8 h-8 ${card.label === 'WhatsApp' ? 'text-[#25D366]' : 'text-[var(--flame-orange)]'}`} />
                <p className="text-xs text-[var(--smoke)] uppercase tracking-wide mt-4">{card.label}</p>
                <p className="font-mono-data text-white font-bold text-lg mt-1">{card.value}</p>
                <p className="text-sm text-[var(--smoke)] mt-2">{card.note}</p>
                {card.action && (
                  <a
                    href={card.action.href}
                    target={card.action.type === 'wa' ? '_blank' : undefined}
                    rel={card.action.type === 'wa' ? 'noopener noreferrer' : undefined}
                    className={`inline-block mt-4 text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
                      card.action.type === 'wa'
                        ? 'bg-[#25D366] text-white hover:brightness-110'
                        : 'text-[var(--copper)] hover:text-white'
                    }`}
                  >
                    {card.action.text}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 bg-[var(--charcoal)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="reveal text-white font-semibold text-xl mb-4">Мы на карте</h2>
          <div className="reveal aspect-video rounded-xl overflow-hidden border border-[var(--charcoal-surface)]">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=37.6176%2C55.7558&z=12&pt=37.6176,55.7558,pm2dgl"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.7) invert(0.9)' }}
              allowFullScreen
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[var(--smoke)] mt-3">г. Москва, ул. Кузнецкая, 15, стр. 2</p>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-20 bg-[var(--charcoal-panel)]">
        <div className="max-w-[600px] mx-auto px-4 text-center">
          <div className="reveal">
            <div className="inline-block animate-pulse-glow rounded-full">
              <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <h2 className="reveal reveal-delay-1 text-white font-bold text-2xl md:text-3xl mt-8">
            Быстрый ответ — в WhatsApp
          </h2>
          <p className="reveal reveal-delay-2 text-[var(--ash)] text-lg mt-4">
            Напишите нам прямо сейчас, и мы поможем подобрать идеальный гриль, рассчитаем доставку и ответим на все вопросы.
          </p>
          <div className="reveal reveal-delay-3 mt-10">
            <WhatsAppButton fullWidth />
          </div>
          <p className="reveal reveal-delay-4 text-sm text-[var(--smoke)] mt-6">
            Или позвоните: <a href="tel:+79001234567" className="text-[var(--copper)]">+7 (900) 123-45-67</a>
          </p>
        </div>
      </section>
    </div>
  );
}
