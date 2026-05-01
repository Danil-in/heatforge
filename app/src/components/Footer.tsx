import { Link } from 'react-router-dom';
import { Flame, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[var(--charcoal-panel)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Flame className="w-4 h-4 text-[var(--flame-orange)]" />
              <span className="text-white font-extrabold text-lg tracking-wider">HEATFORGE</span>
            </Link>
            <p className="text-sm text-[var(--ash)] leading-relaxed">
              Кузница огня с 2019 года. Ручная работа — каждый шов, каждый угол.
            </p>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Каталог</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-[var(--ash)] hover:text-[var(--copper)] transition-colors">Грили и мангалы</Link></li>
              <li><Link to="/" className="text-sm text-[var(--ash)] hover:text-[var(--copper)] transition-colors">Аксессуары</Link></li>
              <li><Link to="/" className="text-sm text-[var(--ash)] hover:text-[var(--copper)] transition-colors">Уход и чистка</Link></li>
              <li><Link to="/" className="text-sm text-[var(--ash)] hover:text-[var(--copper)] transition-colors">Новинки</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Информация</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-[var(--ash)] hover:text-[var(--copper)] transition-colors">О компании</Link></li>
              <li><Link to="/contacts" className="text-sm text-[var(--ash)] hover:text-[var(--copper)] transition-colors">Доставка и оплата</Link></li>
              <li><Link to="/contacts" className="text-sm text-[var(--ash)] hover:text-[var(--copper)] transition-colors">Гарантия</Link></li>
              <li><Link to="/blog" className="text-sm text-[var(--ash)] hover:text-[var(--copper)] transition-colors">Блог</Link></li>
              <li><Link to="/contacts" className="text-sm text-[var(--ash)] hover:text-[var(--copper)] transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Есть вопрос?</h4>
            <p className="text-base text-[var(--ash)] mb-4">
              Напишите нам в WhatsApp — ответим за 10 минут.
            </p>
            <a
              href="https://wa.me/79001234567?text=Здравствуйте! Интересует продукция HeatForge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-fire text-white text-sm font-semibold px-6 py-3 rounded-md hover:brightness-110 transition-all"
            >
              <Phone className="w-4 h-4" />
              Написать в WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-[var(--charcoal-surface)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--smoke)]">© 2025 HeatForge. Все права защищены.</p>
          <div className="flex gap-4 text-xs text-[var(--smoke)]">
            <span className="hover:text-[var(--copper)] cursor-pointer transition-colors">Политика конфиденциальности</span>
            <span>|</span>
            <span className="hover:text-[var(--copper)] cursor-pointer transition-colors">Публичная оферта</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
