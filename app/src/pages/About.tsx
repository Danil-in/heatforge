import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeader from '@/components/SectionHeader';
import { Shield, Package, RotateCcw, Award, Hammer } from 'lucide-react';

export default function About() {
  useScrollReveal();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 relative">
        <span className="reveal text-xs font-medium text-[var(--flame-orange)] uppercase tracking-[0.15em]">О КОМПАНИИ</span>
        <h1 
          className="reveal reveal-delay-1 text-white font-bold leading-[1.15] max-w-[800px] mt-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', textShadow: '0 0 50px rgba(242,106,46,0.15)' }}
        >
          Мы не просто делаем мангалы — мы куем их в огне
        </h1>
        <p className="reveal reveal-delay-2 text-lg text-[var(--ash)] max-w-[600px] mt-8 leading-relaxed">
          С 2019 года создаем грили ручной работы из стали толщиной 2–4 мм. Каждое изделие проходит 12 этапов контроля качества.
        </p>
        <div className="reveal reveal-delay-3 w-24 h-24 bg-gradient-fire rounded-full flex items-center justify-center text-white font-bold text-xl mt-12 shadow-[0_8px_30px_rgba(242,106,46,0.4)]">
          С 2019
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-[var(--charcoal-panel)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
            <div className="reveal">
              <h2 className="text-white font-bold text-3xl">История началась с одного мангала</h2>
              <p className="text-[var(--ash)] mt-4 leading-relaxed">
                В 2019 году основатель HeatForge, Максим, сварил свой первый мангал для семейного пикника. Друзья были в восторге — сталь была толще, чем у магазинных моделей, а конструкция продумана до мелочей.
              </p>
              <p className="text-[var(--ash)] mt-4 leading-relaxed">
                Так появилась идея: создавать грилы, которые не сломаются через сезон. Без компромиссов в материалах, без экономии на толщине стали. Только ручная работа, только качественная сталь, только контроль на каждом этапе.
              </p>
              <p className="text-[var(--ash)] mt-4 leading-relaxed">
                Сегодня HeatForge — это команда из 8 мастеров, собственная мастерская площадью 400 м² и более 5 000 довольных клиентов по всей России.
              </p>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="bg-[var(--charcoal-surface)] rounded-xl aspect-[4/5] flex items-center justify-center overflow-hidden">
                <Hammer className="w-32 h-32 text-[var(--flame-orange)] opacity-30" />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16">
            {[
              { num: '5 000+', label: 'Довольных клиентов' },
              { num: '8', label: 'Мастеров в команде' },
              { num: '6', label: 'Моделей грилей' },
            ].map((stat, i) => (
              <div key={i} className="reveal text-center" style={{ transitionDelay: `${i * 150}ms` }}>
                <span className="font-mono-data text-[var(--flame-orange)] font-bold text-3xl md:text-4xl">{stat.num}</span>
                <p className="text-sm text-[var(--smoke)] mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-20 bg-[var(--charcoal)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeader overline="ПРОИЗВОДСТВО" title="Как рождается каждый гриль" centered />

          <div className="hidden md:block relative mt-14">
            <div className="absolute top-6 left-[10%] right-[10%] h-[1px] bg-[var(--charcoal-surface)]" />
            <div className="grid grid-cols-5 gap-4">
              {[
                { num: '1', title: 'Резка стали', desc: 'Лазерная резка стали толщиной 2–4 мм с точностью до 0.1 мм' },
                { num: '2', title: 'Гибка', desc: 'Формирование деталей на гидравлическом прессе' },
                { num: '3', title: 'Сварка', desc: 'Ручная дуговая сварка каждого шва опытным мастером' },
                { num: '4', title: 'Шлифовка', desc: 'Обработка всех поверхностей и снятие заусенцев' },
                { num: '5', title: 'Контроль', desc: 'Финальная проверка: геометрия, сварные швы, покрытие' },
              ].map((step, i) => (
                <div key={i} className="reveal flex flex-col items-center text-center" style={{ transitionDelay: `${i * 200}ms` }}>
                  <div className="w-12 h-12 rounded-full bg-[var(--flame-orange)] text-white font-bold flex items-center justify-center relative z-10">
                    {step.num}
                  </div>
                  <h3 className="text-white font-semibold text-sm mt-4">{step.title}</h3>
                  <p className="text-[var(--ash)] text-xs mt-2 max-w-[160px]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden mt-14 space-y-8 relative pl-8">
            <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-[var(--charcoal-surface)]" />
            {[
              { num: '1', title: 'Резка стали', desc: 'Лазерная резка с точностью до 0.1 мм' },
              { num: '2', title: 'Гибка', desc: 'Формирование деталей на гидравлическом прессе' },
              { num: '3', title: 'Сварка', desc: 'Ручная дуговая сварка каждого шва' },
              { num: '4', title: 'Шлифовка', desc: 'Обработка всех поверхностей' },
              { num: '5', title: 'Контроль', desc: 'Финальная проверка качества' },
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
      </section>

      {/* Guarantees */}
      <section className="py-20 bg-[var(--charcoal)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeader overline="ГАРАНТИИ" title="Покупайте с уверенностью" centered />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {[
              { icon: Shield, title: 'Гарантия 2 года', desc: 'На всю продукцию HeatForge действует расширенная гарантия. Любой заводской дефект — бесплатная замена.' },
              { icon: Package, title: 'Деревянная упаковка', desc: 'Каждый гриль упаковывается в прочный деревянный ящик. Доедет в любую точку России целым и невредимым.' },
              { icon: RotateCcw, title: 'Возврат 14 дней', desc: 'Если изделие не подошло — вернем деньги в течение 14 дней. Без лишних вопросов и бюрократии.' },
              { icon: Award, title: 'Сертификаты качества', desc: 'Вся продукция соответствует ГОСТ и имеет сертификаты соответствия. Сталь — только от проверенных поставщиков.' },
            ].map((g, i) => (
              <div key={i} className="reveal bg-[var(--charcoal-panel)] rounded-xl p-6 border border-white/[0.04] text-center" style={{ transitionDelay: `${i * 150}ms` }}>
                <g.icon className="w-12 h-12 text-[var(--flame-orange)] mx-auto" />
                <h3 className="text-white font-semibold text-lg mt-4">{g.title}</h3>
                <p className="text-[var(--ash)] text-sm mt-2 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-fire">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <h2 className="text-white font-bold text-3xl">Готовы выбрать свой гриль?</h2>
          <p className="text-white/85 text-lg mt-4">Более 6 моделей и 10 аксессуаров ждут вас в каталоге</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              to="/"
              className="bg-white text-[var(--flame-orange)] font-semibold px-8 py-3.5 rounded-lg hover:brightness-105 transition-all w-full sm:w-auto text-center"
            >
              В каталог
            </Link>
            <a
              href="https://wa.me/79001234567?text=Здравствуйте! Интересует продукция HeatForge"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-all w-full sm:w-auto text-center"
            >
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
