'use client';

import { motion } from 'framer-motion';
import { TypingText } from '../components';

import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';

const About = () => (
  <section id="about" className={`${styles.paddings} relative z-10 scroll-mt-[110px]`}>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About AETHER" textStyles="text-center" />

      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        <span className="font-extrabold text-white">AETHER</span> is a spatial
        platform where digital worlds feel close enough to touch. Pull on a
        headset and step across the threshold into{' '}
        <span className="font-extrabold text-white">living worlds</span> you can
        walk through, build in, and share. No menus to wrestle, no learning
        curve to climb &mdash; just choose a world and{' '}
        <span className="font-extrabold text-white">explore</span>. Keep
        scrolling to see where you could go
      </motion.p>

      <motion.img
        variants={fadeIn('up', 'tween', 0.3, 1)}
        src="/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About;
