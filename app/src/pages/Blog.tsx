import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blog';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Calendar, Clock } from 'lucide-react';

export default function Blog() {
  useScrollReveal();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="pt-20 pb-12 text-center px-4">
        <span className="reveal text-xs font-medium text-[var(--flame-orange)] uppercase tracking-[0.15em]">БЛОГ</span>
        <h1 className="reveal reveal-delay-1 text-white font-bold text-4xl mt-3">Рецепты и советы для гриля</h1>
        <p className="reveal reveal-delay-2 text-lg text-[var(--ash)] mt-4 max-w-[700px] mx-auto">
          Лучшие рецепты от опытных шашлычников. Готовьте на наших грилях — получится идеально.
        </p>
      </section>

      {/* Articles Grid */}
      <section className="py-8 bg-[var(--charcoal)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blogPosts.map((post, i) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="reveal group block bg-[var(--charcoal-panel)] rounded-2xl overflow-hidden border border-white/[0.04] transition-all duration-400 ease-crucible hover:-translate-y-1.5 hover:border-[var(--copper)]/15 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-smelt group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-[var(--copper)] uppercase tracking-wide">Рецепт</span>
                  <h3 className="text-white font-bold text-xl mt-1 line-clamp-2 group-hover:text-[var(--copper-light)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[var(--ash)] text-sm mt-3 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center gap-4 mt-4 text-xs text-[var(--smoke)]">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime} чтения</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-[var(--charcoal-panel)]">
        <div className="reveal max-w-[500px] mx-auto px-4 text-center">
          <h3 className="text-white font-bold text-xl">Новые рецепты на почту</h3>
          <p className="text-[var(--ash)] mt-2">Подпишитесь и получайте лучшие рецепты для грила раз в неделю.</p>
          <div className="flex mt-6">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 bg-[var(--charcoal-surface)] border border-[var(--charcoal-surface)] rounded-l-lg px-4 py-3 text-white placeholder-[var(--smoke)] outline-none focus:border-[var(--copper)] transition-colors"
            />
            <button className="bg-[var(--flame-orange)] text-white text-sm font-semibold px-6 py-3 rounded-r-lg hover:brightness-110 transition-all">
              Подписаться
            </button>
          </div>
          <p className="text-xs text-[var(--smoke)] mt-3">Никакого спама. Отписаться можно в любой момент.</p>
        </div>
      </section>
    </div>
  );
}
