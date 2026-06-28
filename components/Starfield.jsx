'use client';

import { useEffect, useRef } from 'react';

const BASE_STARS = 130;
const DENSE_STARS = 260;
const FIREFLY_COUNT = 22;
const CONNECT_COUNT = 110;
const CONNECT_DIST = 150;
const STAR_COOL = '#cdd6ff';
const STAR_WARM = '#ffd9a8';

// Full-bleed canvas behind all content. Always a tinted starfield; the active
// world's `data-ambience` (set on <html>) swaps in a signature effect:
// dense | comets | moon | embers | fireflies. Reduced-motion -> static stars.
const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rand = (min, max) => Math.random() * (max - min) + min;

    const makeSprite = (color) => {
      const size = 32;
      const c = document.createElement('canvas');
      c.width = size;
      c.height = size;
      const g = c.getContext('2d');
      const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.22, color);
      grad.addColorStop(1, 'transparent');
      g.fillStyle = grad;
      g.fillRect(0, 0, size, size);
      return c;
    };

    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars = [];
    let comets = [];
    let embers = [];
    let fireflies = [];
    let bubbles = [];
    let frameId = null;
    let frame = 0;
    let scrollPos = window.scrollY;
    let glow = '#22D3EE';
    let base = '#0E1116';
    let accent = '#7C3AED';
    let spriteCool = null;
    let spriteWarm = null;
    let spriteGlow = null;
    let ambience = 'stars';
    let lastCometAt = 0;
    let nextCometGap = 2000;
    let driftY = 0;

    const makeStars = () => {
      stars = Array.from({ length: DENSE_STARS }, () => {
        const roll = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: rand(0.5, 2.1),
          depth: rand(0.15, 0.65),
          phase: Math.random() * Math.PI * 2,
          speed: rand(0.3, 0.9),
          kind: roll > 0.85 ? 'warm' : (roll > 0.6 ? 'glow' : 'cool'),
        };
      });
    };

    const resetFeatures = () => {
      driftY = 0;
      comets = [];
      embers = [];
      fireflies = ambience === 'fireflies'
        ? Array.from({ length: FIREFLY_COUNT }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: rand(-0.25, 0.25),
          vy: rand(-0.25, 0.25),
          phase: Math.random() * Math.PI * 2,
          speed: rand(0.6, 1.4),
          r: rand(1.2, 2.4),
        }))
        : [];
      bubbles = ambience === 'bubbles'
        ? Array.from({ length: 14 }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: rand(6, 22),
          vy: rand(-1.1, -0.5),
          phase: Math.random() * Math.PI * 2,
          amp: rand(0.3, 1),
        }))
        : [];
    };

    const readState = () => {
      const cs = getComputedStyle(document.documentElement);
      const g = cs.getPropertyValue('--color-glow').trim();
      const b = cs.getPropertyValue('--color-base').trim();
      const a = cs.getPropertyValue('--color-accent').trim();
      if (g && g !== glow) {
        glow = g;
        spriteGlow = makeSprite(glow);
      }
      if (b) base = b;
      if (a) accent = a;
      const next = document.documentElement.dataset.ambience || 'stars';
      if (next !== ambience) {
        ambience = next;
        resetFeatures();
      }
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
      resetFeatures();
    };

    const drawStars = (time) => {
      const dense = ambience === 'dense';
      const count = dense ? stars.length : BASE_STARS;
      const drift = dense || ambience === 'aurora' ? driftY : 0;
      const pts = [];
      for (let i = 0; i < count; i += 1) {
        const s = stars[i];
        const yPos = (((s.y - scrollPos * s.depth + drift * s.depth) % height) + height) % height;
        const node = dense && i < CONNECT_COUNT;
        if (node) pts.push({ x: s.x, y: yPos });
        const alpha = reduceMotion
          ? 0.6
          : 0.35 + 0.5 * (0.5 + 0.5 * Math.sin(time * 0.001 * s.speed + s.phase));
        ctx.globalAlpha = alpha;
        const sprite = s.kind === 'warm' ? spriteWarm : (s.kind === 'glow' ? spriteGlow : spriteCool);
        const d = (node ? s.r + 1.6 : s.r) * 6;
        ctx.drawImage(sprite, s.x - d / 2, yPos - d / 2, d, d);
      }
      ctx.globalAlpha = 1;

      if (dense) {
        ctx.strokeStyle = glow;
        ctx.lineWidth = 1;
        for (let i = 0; i < pts.length; i += 1) {
          for (let j = i + 1; j < pts.length; j += 1) {
            const dx = pts[i].x - pts[j].x;
            const dy = pts[i].y - pts[j].y;
            const dist = Math.hypot(dx, dy);
            if (dist < CONNECT_DIST) {
              ctx.globalAlpha = (1 - dist / CONNECT_DIST) * 0.18;
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1;
      }
    };

    const drawComets = (time) => {
      if (time - lastCometAt > nextCometGap) {
        comets.push({
          x: rand(width * 0.3, width * 0.95),
          y: rand(-40, height * 0.3),
          vx: rand(-7, -4),
          vy: rand(3, 5),
          len: rand(90, 160),
        });
        lastCometAt = time;
        nextCometGap = rand(1600, 4200);
      }
      comets = comets.filter((c) => c.x > -60 && c.y < height + 60);
      for (let i = 0; i < comets.length; i += 1) {
        const c = comets[i];
        c.x += c.vx;
        c.y += c.vy;
        const mag = Math.hypot(c.vx, c.vy) || 1;
        const tx = c.x - (c.vx / mag) * c.len;
        const ty = c.y - (c.vy / mag) * c.len;
        const grad = ctx.createLinearGradient(c.x, c.y, tx, ty);
        grad.addColorStop(0, glow);
        grad.addColorStop(1, 'transparent');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    const drawBubbles = (time) => {
      const t = time * 0.001;
      ctx.save();

      // gentle ripples
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 4; i += 1) {
        const baseY = height * (0.22 + i * 0.18);
        ctx.globalAlpha = 0.05 + 0.04 * (0.5 + 0.5 * Math.sin(t * 0.6 + i));
        ctx.beginPath();
        for (let x = 0; x <= width; x += 12) {
          const y = baseY
            + Math.sin(x * 0.01 + t + i) * 10
            + Math.sin(x * 0.023 - t * 0.7) * 6;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // floating bubbles
      if (!reduceMotion && Math.random() < 0.035) {
        bubbles.push({
          x: Math.random() * width,
          y: height + 20,
          r: rand(6, 22),
          vy: rand(-1.1, -0.5),
          phase: Math.random() * Math.PI * 2,
          amp: rand(0.3, 1),
        });
      }
      bubbles = bubbles.filter((b) => b.y + b.r > -10);
      ctx.strokeStyle = glow;
      ctx.lineWidth = 1.5;
      for (let i = 0; i < bubbles.length; i += 1) {
        const b = bubbles[i];
        if (!reduceMotion) {
          b.y += b.vy;
          b.phase += 0.02;
        }
        const bx = b.x + Math.sin(b.phase) * b.amp * 10;
        ctx.globalAlpha = 0.18;
        ctx.beginPath();
        ctx.arc(bx, b.y, b.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(bx - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.16, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    };

    const drawEmbers = () => {
      if (!reduceMotion && Math.random() < 0.4) {
        embers.push({
          x: Math.random() * width,
          y: height + 10,
          vx: rand(-0.3, 0.3),
          vy: rand(-1.4, -0.5),
          r: rand(1, 2.4),
          life: 1,
        });
      }
      embers = embers.filter((e) => e.life > 0 && e.y > -10);
      ctx.fillStyle = glow;
      for (let i = 0; i < embers.length; i += 1) {
        const e = embers[i];
        e.x += e.vx;
        e.y += e.vy;
        e.life -= 0.004;
        ctx.globalAlpha = Math.max(0, e.life) * 0.8;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawFireflies = (time) => {
      ctx.fillStyle = glow;
      for (let i = 0; i < fireflies.length; i += 1) {
        const f = fireflies[i];
        if (!reduceMotion) {
          f.x += f.vx;
          f.y += f.vy;
          if (f.x < 0 || f.x > width) f.vx *= -1;
          if (f.y < 0 || f.y > height) f.vy *= -1;
        }
        const a = 0.2 + 0.6 * (0.5 + 0.5 * Math.sin(time * 0.001 * f.speed + f.phase));
        ctx.globalAlpha = a * 0.25;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const draw = (time) => {
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, width, height);
      drawStars(time);
      if (ambience === 'comets' && !reduceMotion) drawComets(time);
      if (ambience === 'bubbles') drawBubbles(time);
      if (ambience === 'embers') drawEmbers();
      if (ambience === 'fireflies') drawFireflies(time);
    };

    const animate = (time) => {
      frame += 1;
      driftY += 0.25;
      if (frame % 12 === 0) readState();
      draw(time);
      frameId = requestAnimationFrame(animate);
    };

    const onScroll = () => { scrollPos = window.scrollY; };

    readState();
    spriteCool = makeSprite(STAR_COOL);
    spriteWarm = makeSprite(STAR_WARM);
    spriteGlow = makeSprite(glow);
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
    <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none" />
  );
};

export default Starfield;
