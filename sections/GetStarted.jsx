'use client';

import { motion } from 'framer-motion';

import styles from '../styles';
import { startingFeatures } from '../constants';
import { StartSteps, TitleText, TypingText } from '../components';
import { staggerContainer, fadeIn, planetVariants } from '../utils/motion';

const GetStarted = () => (
  <section id="get-started" className={`${styles.paddings} relative z-10 scroll-mt-[110px]`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
      <motion.div
        variants={planetVariants('left')}
        className={`flex-1 ${styles.flexCenter}`}
      >
        <img
          src="/get-started.png"
          alt="get-started"
          className="w-[90%] h-[90%] object-contain"
        />
      </motion.div>
      <motion.div
        variants={fadeIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] flex justify-center flex-col"
      >
        <TypingText title="| How AETHER Works" />
        <TitleText title={<>Get started with just a few clicks</>} />
        <div className="relative mt-[31px] flex flex-col max-w-[370px] gap-[24px]">
          <div
            aria-hidden="true"
            className="absolute left-[35px] top-[35px] bottom-[35px] w-[2px] bg-white/10"
          />
          {startingFeatures.map((feature, index) => (
            <StartSteps
              key={feature}
              number={`${index + 1 < 10 ? '0' : ''}${index + 1}`}
              text={feature}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default GetStarted;
