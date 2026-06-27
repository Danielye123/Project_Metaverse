'use client';

import {
  motion, useScroll, useSpring, useTransform,
} from 'framer-motion';

const RAIL = 200;

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const y = useTransform(smooth, [0, 1], [0, RAIL]);

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block w-[2px] rounded-full bg-white/10"
      style={{ height: RAIL }}
      aria-hidden="true"
    >
      <motion.div
        style={{ scaleY: smooth }}
        className="absolute inset-0 origin-top rounded-full bg-glow opacity-50"
      />
      <motion.span
        style={{ y }}
        className="absolute -left-[5px] -top-[6px] w-[12px] h-[12px] rounded-full bg-glow shadow-[0_0_12px_var(--color-glow)]"
      />
    </div>
  );
};

export default ScrollProgress;
