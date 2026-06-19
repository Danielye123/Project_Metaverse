'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

import styles from '../styles';
import { useWorldTheme } from '../context/WorldThemeContext';
import { fadeIn, slideIn, staggerContainer, textVariant } from '../utils/motion';

const DEFAULT_TAGLINE = 'Step into worlds that feel real. Pick a world, pull on your headset, and walk in.';

const Hero = () => {
  const { scrollY } = useScroll();
  const coverY = useTransform(scrollY, [0, 600], [0, 90]);
  const { activeWorld } = useWorldTheme();

  const cover = activeWorld?.imgUrl ?? '/cover.webp';
  const tagline = activeWorld?.tagline ?? DEFAULT_TAGLINE;

  return (
    <section className={`${styles.yPaddings} ${styles.xPaddings}`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <div className="flex justify-center items-center flex-col relative z-10">
          <motion.h1 variants={textVariant(1.1)} className={styles.heroHeading}>
            Enter
          </motion.h1>
          <motion.div
            variants={textVariant(1.2)}
            className="flex flex-row justify-center items-center"
          >
            <h1 className={`${styles.heroHeading} hero-gradient-text`}>Aether</h1>
          </motion.div>

          <motion.p
            variants={fadeIn('up', 'tween', 0.3, 1)}
            className="mt-[16px] font-normal sm:text-[24px] text-[18px] text-center text-secondary-white max-w-[640px]"
          >
            {tagline}
          </motion.p>

          <motion.div
            variants={fadeIn('up', 'tween', 0.4, 1)}
            className="mt-[28px] flex flex-wrap justify-center gap-4"
          >
            <a
              href="#explore"
              className="flex items-center gap-[12px] py-4 px-6 bg-accent rounded-[32px] font-medium text-[16px] text-white"
            >
              <img src="/headset.svg" alt="" className="w-[20px] h-[20px] object-contain" />
              Enter AETHER
            </a>
            <a
              href="#about"
              className="flex items-center py-4 px-6 rounded-[32px] border-[1px] border-white/30 font-medium text-[16px] text-white hover:bg-white/5 transition-colors"
            >
              Learn more
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={slideIn('right', 'tween', 0.2, 1)}
          className="relative w-full md:mt-[60px] mt-[40px]"
        >
          <div className="absolute w-full h-[300px] hero-gradient rounded-tl-[140px] z-[0] -top-[30px]" />

          <motion.img
            style={{ y: coverY }}
            src={cover}
            alt="hero_cover"
            className="w-full sm:h-[500px] h-[350px] object-cover rounded-tl-[140px] z-10 relative"
          />

          <div className="absolute inset-0 rounded-tl-[140px] bg-gradient-to-t from-[rgba(14,17,22,0.7)] to-transparent z-10 pointer-events-none" />

          <a href="#explore" aria-label="Scroll to explore worlds">
            <div className="w-full flex justify-end sm:-mt-[70px] -mt-[50px] pr-[40px] relative z-20">
              <motion.img
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                src="/stamp.webp"
                alt="stamp"
                className="sm:w-[155px] w-[100px] sm:h-[155px] h-[100px] object-contain"
              />
            </div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
