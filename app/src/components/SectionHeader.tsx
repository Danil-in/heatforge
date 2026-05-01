interface SectionHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({ overline, title, subtitle, centered = false, className = '' }: SectionHeaderProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {overline && (
        <span className="reveal inline-block text-xs font-medium text-[var(--flame-orange)] uppercase tracking-[0.15em] mb-3">
          {overline}
        </span>
      )}
      <h2 className="reveal reveal-delay-1 text-white font-bold" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="reveal reveal-delay-2 text-[var(--ash)] text-lg leading-relaxed mt-3 max-w-[600px]" style={centered ? { margin: '0.75rem auto 0' } : {}}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
