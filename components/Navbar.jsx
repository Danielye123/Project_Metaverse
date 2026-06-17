'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import styles from '../styles';
import { navLinks } from '../constants';
import { navVariants } from '../utils/motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="show"
      className={`${styles.xPaddings} py-6 sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-[rgba(14,17,22,0.72)] backdrop-blur-md border-b border-white/10' : ''
      }`}
    >
      <div
        className={`absolute w-[50%] inset-0 gradient-01 transition-opacity duration-300 ${
          scrolled ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div className={`${styles.innerWidth} mx-auto flex items-center justify-between gap-8 relative`}>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-extrabold text-[24px] leading-[30px] text-white"
        >
          AETHER
        </button>

        <ul className="sm:flex hidden items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`font-normal text-[16px] transition-colors ${
                  activeId === link.id ? 'text-white' : 'text-secondary-white hover:text-white'
                }`}
              >
                {link.title}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#pricing"
              className="py-2 px-5 rounded-full bg-accent text-white text-[14px] font-medium"
            >
              Get access
            </a>
          </li>
        </ul>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="sm:hidden"
        >
          <img src="/menu.svg" alt="" className="w-[24px] h-[24px] object-contain" />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden overflow-hidden flex flex-col gap-1 mt-4 relative"
          >
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 font-normal text-[16px] ${
                    activeId === link.id ? 'text-white' : 'text-secondary-white'
                  }`}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
