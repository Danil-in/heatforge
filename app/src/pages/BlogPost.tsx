import { useParams, Link } from 'react-router-dom';
import { getBlogPostBySlug, getRelatedPosts } from '@/data/blog';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeader from '@/components/SectionHeader';
import { Calendar, Clock, Users, Flame, ArrowLeft } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || '');
  const relatedPosts = post ? getRelatedPosts(post.slug) : [];

  useScrollReveal();

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-white text-2xl font-bold">Статья не найдена</h1>
          <Link to="/blog" className="text-[var(--copper)] mt-4 inline-block">Вернуться в блог</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Image */}
      <div className="relative w-full max-h-[50vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover max-h-[50vh]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-12 -mt-16 relative z-10">
        <Link to="/blog" className="reveal inline-flex items-center gap-1 text-sm text-[var(--copper)] hover:text-[var(--copper-light)] mb-6">
          <ArrowLeft className="w-4 h-4" /> Все рецепты
        </Link>

        {/* Meta */}
        <div className="reveal flex items-center gap-4 text-sm text-[var(--smoke)]">
          <span className="text-[var(--copper)] uppercase text-xs font-semibold tracking-wide">Рецепт</span>
          <span>{post.date}</span>
          <span>{post.readTime} чтения</span>
        </div>

        {/* Title */}
        <h1 
          className="reveal reveal-delay-1 text-white font-bold leading-[1.1] mt-4"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
        >
          {post.title}
        </h1>

        <p className="reveal reveal-delay-2 text-lg text-[var(--ash)] mt-4 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Body Content */}
        <div
          className="reveal mt-8 prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Recipe Block */}
        {post.recipe && (
          <div className="reveal bg-[var(--charcoal-panel)] rounded-2xl p-6 sm:p-8 border border-white/[0.04] my-10">
            <h2 className="text-white font-bold text-2xl">Рецепт</h2>

            {/* Recipe Meta */}
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center gap-2 bg-[var(--charcoal-surface)] rounded-lg px-4 py-2 text-sm text-[var(--smoke)]">
                <Clock className="w-4 h-4 text-[var(--flame-orange)]" />
                Подготовка: {post.recipe.prepTime}
              </div>
              <div className="flex items-center gap-2 bg-[var(--charcoal-surface)] rounded-lg px-4 py-2 text-sm text-[var(--smoke)]">
                <Flame className="w-4 h-4 text-[var(--flame-orange)]" />
                Приготовление: {post.recipe.cookTime}
              </div>
              <div className="flex items-center gap-2 bg-[var(--charcoal-surface)] rounded-lg px-4 py-2 text-sm text-[var(--smoke)]">
                <Users className="w-4 h-4 text-[var(--flame-orange)]" />
                {post.recipe.servings} порций
              </div>
            </div>

            {/* Ingredients */}
            <div className="mt-8">
              <h3 className="text-white font-semibold text-xl">Ингредиенты</h3>
              <ul className="mt-4 space-y-2">
                {post.recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-3 text-[var(--ash)]">
                    <input type="checkbox" className="mt-1 accent-[var(--flame-orange)]" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div className="mt-10">
              <h3 className="text-white font-semibold text-xl">Приготовление</h3>
              <div className="mt-6 space-y-6">
                {post.recipe.steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-[var(--flame-orange)] text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
                      {i + 1}
                    </div>
                    <p className="text-[var(--ash)] leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="reveal pt-8 border-t border-[var(--charcoal-surface)]">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-sm text-[var(--copper)] bg-[var(--copper)]/10 px-3 py-1 rounded-md">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-[var(--charcoal-panel)] mt-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
            <SectionHeader title="Другие рецепты" centered className="mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp, i) => (
                <Link
                  key={rp.slug}
                  to={`/blog/${rp.slug}`}
                  className="reveal group block bg-[var(--charcoal)] rounded-xl overflow-hidden border border-white/[0.04] transition-all hover:-translate-y-1 hover:border-[var(--copper)]/15"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img src={rp.image} alt={rp.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-[var(--copper)] uppercase">Рецепт</span>
                    <h3 className="text-white font-semibold mt-1 line-clamp-2 group-hover:text-[var(--copper-light)] transition-colors">{rp.title}</h3>
                    <div className="flex items-center gap-3 mt-3 text-xs text-[var(--smoke)]">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {rp.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {rp.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
