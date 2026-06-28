'use client';

import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'Top' },
  { id: 'about', label: 'About' },
  { id: 'explore', label: 'Worlds' },
  { id: 'get-started', label: 'How it works' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'world', label: 'Community' },
  { id: 'insights', label: 'Insights' },
  { id: 'faq', label: 'FAQ' },
];

// Active-section marker: 'sparkle' | 'planet' | 'rocket' | 'diamond'
const MARKER = 'planet';

const Marker = ({ variant, className }) => {
  if (variant === 'planet') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <circle cx="12" cy="12" r="5.5" fill="currentColor" />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="3.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          transform="rotate(-22 12 12)"
        />
      </svg>
    );
  }
  if (variant === 'rocket') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path d="M12 1.5c2.6 2.4 3.9 5.8 3.9 9.4 0 1.4-.3 2.7-.9 3.9H9c-.6-1.2-.9-2.5-.9-3.9 0-3.6 1.3-7 3.9-9.4z" />
        <path d="M8.4 13.5 6 18l3-1.2zM15.6 13.5 18 18l-3-1.2z" />
      </svg>
    );
  }
  if (variant === 'diamond') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path d="M12 2 L21 12 L12 22 L3 12 Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 0 L14.2 9.8 L24 12 L14.2 14.2 L12 24 L9.8 14.2 L0 12 L9.8 9.8 Z" />
    </svg>
  );
};

const SectionNav = () => {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (id) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const activeIndex = Math.max(0, SECTIONS.findIndex((s) => s.id === active));
  const fraction = activeIndex / (SECTIONS.length - 1);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 top-[8px] bottom-[8px] w-[2px] rounded-full bg-white/15"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 top-[8px] w-[2px] rounded-full bg-accent transition-[height] duration-500 ease-out"
        style={{ height: `calc((100% - 16px) * ${fraction})` }}
      />

      {SECTIONS.map(({ id, label }, i) => {
        const isActive = active === id;
        const isPassed = i < activeIndex;
        return (
          <button
            key={id}
            type="button"
            onClick={() => handleClick(id)}
            aria-label={label}
            aria-current={isActive ? 'true' : undefined}
            className="group relative z-10 flex h-[16px] w-[16px] items-center justify-center"
          >
            {isActive ? (
              <Marker variant={MARKER} className="w-[16px] h-[16px] text-glow drop-shadow-[0_0_6px_var(--color-glow)]" />
            ) : (
              <span
                className={`rounded-full transition-all duration-300 w-[8px] h-[8px] ${
                  isPassed ? 'bg-glow' : 'bg-white/25 group-hover:bg-white/60'
                }`}
              />
            )}
            <span className="absolute right-[22px] whitespace-nowrap text-[12px] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default SectionNav;
