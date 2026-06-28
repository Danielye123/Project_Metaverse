'use client';

import { motion, useReducedMotion } from 'framer-motion';

// Shifting gradient aurora bands, tinted by the active world's CSS vars.
const AuroraWaves = () => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-[-20%]"
      style={{
        background:
          'linear-gradient(115deg, transparent 18%, color-mix(in srgb, var(--color-accent) 30%, transparent) 38%, color-mix(in srgb, var(--color-glow) 32%, transparent) 54%, color-mix(in srgb, var(--color-accent) 20%, transparent) 70%, transparent 86%)',
        backgroundSize: '200% 200%',
        filter: 'blur(40px)',
        mixBlendMode: 'screen',
      }}
      initial={{ opacity: 0 }}
      animate={reduceMotion
        ? { opacity: 1 }
        : {
          opacity: 1,
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          filter: [
            'hue-rotate(0deg) blur(40px)',
            'hue-rotate(25deg) blur(40px)',
            'hue-rotate(0deg) blur(40px)',
          ],
        }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: { duration: 0.8 },
        backgroundPosition: { duration: 16, repeat: Infinity, ease: 'easeInOut' },
        filter: { duration: 16, repeat: Infinity, ease: 'easeInOut' },
      }}
    />
  );
};

export default AuroraWaves;
