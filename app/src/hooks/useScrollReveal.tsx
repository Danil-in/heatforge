import { useEffect, type ReactNode } from 'react';

export function useScrollReveal(selector = '.reveal', threshold = 0.15) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, threshold]);
}

export function ScrollRevealProvider({ children }: { children: ReactNode }) {
  useScrollReveal();
  return <div>{children}</div>;
}
