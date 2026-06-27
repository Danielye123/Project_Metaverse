'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';

import styles from '../styles';
import { TitleText, TypingText } from '../components';

const BlackHole = dynamic(() => import('../components/BlackHole'), { ssr: false });

const Singularity = () => {
  const ref = useRef(null);
  const progressRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.92, 1], [0, 1, 1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    progressRef.current = scrollYProgress.get();
    const unsubscribe = scrollYProgress.onChange((value) => {
      progressRef.current = value;
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <section id="singularity" ref={ref} className="relative h-[200vh]">
      <motion.div
        style={{ opacity }}
        className="sticky top-0 h-screen w-full overflow-hidden bg-primary-black"
      >
        <div className="absolute inset-0 z-0">{mounted ? <BlackHole progressRef={progressRef} /> : null}</div>

        <div className="absolute top-[12%] left-0 right-0 z-10 px-6 text-center pointer-events-none">
          <TypingText title="| The Singularity" textStyles="text-center" />
          <TitleText title={<>Fall past the event horizon</>} textStyles="text-center" />
        </div>
      </motion.div>
    </section>
  );
};

export default Singularity;
