"use client";

import { useEffect, useRef } from "react";

/** Slow-floating dust motes caught in gallery light. Pauses off-screen; skipped for reduced motion. */
export function DustParticles({ className, density = 70 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const count = window.innerWidth < 768 ? Math.round(density * 0.45) : density;

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; t: number };
    let ps: P[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ps = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -Math.random() * 0.12 - 0.02,
        a: Math.random() * 0.5 + 0.15,
        t: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.t += 0.01;
        p.x += p.vx + Math.sin(p.t) * 0.08;
        p.y += p.vy;
        if (p.y < -4) p.y = h + 4;
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        const flicker = 0.6 + Math.sin(p.t * 1.7) * 0.4;
        ctx.beginPath();
        ctx.fillStyle = `rgba(232, 208, 160, ${p.a * flicker})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (visible) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });

    resize();
    io.observe(canvas);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
