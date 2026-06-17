'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

import styles from '../styles';
import { statistics } from '../constants';
import { TitleText, TypingText } from '../components';
import { fadeIn, staggerContainer } from '../utils/motion';

const Counter = ({ value, suffix }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;

    const duration = 1600;
    const startTime = performance.now();
    let frame;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  const display = Number.isInteger(value)
    ? Math.round(count).toLocaleString()
    : count.toFixed(1);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

const Stats = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <TypingText title="| By the numbers" textStyles="text-center" />
      <TitleText title={<>A universe that keeps growing</>} textStyles="text-center" />

      <div className="mt-[50px] flex flex-wrap justify-center gap-6">
        {statistics.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={fadeIn('up', 'spring', index * 0.25, 0.75)}
            className={`flex-1 min-w-[200px] ${styles.flexCenter} flex-col rounded-[24px] bg-surface py-10 px-6 text-center`}
          >
            <h2 className="font-bold sm:text-[56px] text-[40px] text-white">
              <Counter value={stat.value} suffix={stat.suffix} />
            </h2>
            <p className="mt-[8px] font-normal text-[16px] text-secondary-white">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default Stats;
