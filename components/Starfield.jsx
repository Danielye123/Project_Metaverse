'use client';

import { useEffect, useRef } from 'react';

const STAR_COUNT = 160;

// Full-bleed canvas behind all content. Paints its own dark base (so it isn't
// hidden behind the body background) plus stars tinted with the active world's
// --color-glow, drifting with scroll (parallax) and twinkling.
const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars = [];
    let frameId = null;
    let frame = 0;
    let scrollPos = window.scrollY;
    let glow = '#22D3EE';
    let base = '#0E1116';

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      const g = cs.getPropertyValue('--color-glow').trim();
      const b = cs.getPropertyValue('--color-base').trim();
      if (g) glow = g;
      if (b) base = b;
    };

    const makeStars = () => {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.5,
        depth: Math.random() * 0.5 + 0.15,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.6 + 0.3,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeStars();
    };

    const draw = (time) => {
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = glow;
      for (let i = 0; i < stars.length; i += 1) {
        const s = stars[i];
        const yPos = (((s.y - scrollPos * s.depth) % height) + height) % height;
        const alpha = reduceMotion
          ? 0.7
          : 0.4 + 0.5 * (0.5 + 0.5 * Math.sin(time * 0.001 * s.speed + s.phase));
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(s.x, yPos, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const animate = (time) => {
      frame += 1;
      if (frame % 15 === 0) readColors();
      draw(time);
      frameId = requestAnimationFrame(animate);
    };

    const onScroll = () => { scrollPos = window.scrollY; };

    readColors();
    resize();
    window.addEventListener('resize', resize);

    if (reduceMotion) {
      draw(0);
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
      frameId = requestAnimationFrame(animate);
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

export default Starfield;
