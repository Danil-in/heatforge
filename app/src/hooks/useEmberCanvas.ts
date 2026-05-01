import { useEffect, useRef } from 'react';

interface EmberPoint {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  temp: number;
  speed: number;
  seed: number;
}

export function useEmberCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const POINT_COUNT = 600;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Generate ember points
    const points: EmberPoint[] = [];
    const minDist = Math.min(width, height) * 0.015;

    for (let i = 0; i < POINT_COUNT; i++) {
      let x: number, y: number, ok: boolean;
      let attempts = 0;
      do {
        ok = true;
        x = Math.random() * width;
        y = Math.random() * height;
        for (const p of points) {
          const dx = p.baseX - x;
          const dy = p.baseY - y;
          if (Math.sqrt(dx * dx + dy * dy) < minDist) {
            ok = false;
            break;
          }
        }
        attempts++;
      } while (!ok && attempts < 50);

      points.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: 4 + Math.random() * 10,
        temp: 0.3 + Math.random() * 0.7,
        speed: 0.8 + Math.random() * 0.4,
        seed: Math.random() * Math.PI * 2,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / width;
      mouseRef.current.targetY = e.clientY / height;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    const startTime = performance.now();

    const animate = (now: number) => {
      const time = (now - startTime) / 1000;

      // Lerp mouse
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.fillStyle = '#111111';
      ctx.fillRect(0, 0, width, height);

      for (const p of points) {
        // Drift
        if (!prefersReducedMotion) {
          p.x = p.baseX + Math.sin(time * p.speed * 0.8 + p.seed) * (width * 0.008);
          p.y = p.baseY + Math.sin(time * p.speed * 0.5 + p.seed * 1.5) * (height * 0.005);

          // Wrap around
          if (p.x < -20) p.x += width + 40;
          if (p.x > width + 20) p.x -= width + 40;
          if (p.y < -20) p.y += height + 40;
          if (p.y > height + 20) p.y -= height + 40;
        }

        // Brightness modulation
        let intensity = p.temp * (0.7 + 0.3 * Math.sin(time * 2 + p.seed * 6.28));

        // Mouse interaction
        const mdx = (p.x / width) - mouse.x;
        const mdy = (p.y / height) - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 0.15) {
          intensity += 0.4 * (1 - mDist / 0.15);
        }

        intensity = Math.min(intensity, 1.2);

        // Color based on temperature/intensity
        const r = Math.min(255, Math.floor(180 + intensity * 75));
        const g = Math.min(255, Math.floor(40 + intensity * 80));
        const b = Math.floor(intensity * 20);
        const alpha = Math.min(1, intensity * 0.8);

        // Draw glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        gradient.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.min(255, r + 40)},${Math.min(255, g + 40)},${b + 10},${Math.min(1, alpha + 0.2)})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef]);
}
