'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Replaces a static gradient-blob div with one that slowly parallaxes and
// rotates as it scrolls through the viewport. `baseRotate` reproduces the
// blob's CSS rotation (framer's inline transform overrides the class's).
const ParallaxBlob = ({ className, baseRotate = 0, range = 100 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);
  const rotate = useTransform(scrollYProgress, [0, 1], [baseRotate - 8, baseRotate + 8]);

  return <motion.div ref={ref} aria-hidden="true" style={{ y, rotate }} className={className} />;
};

export default ParallaxBlob;
