'use client';

import { motion } from 'framer-motion';

import styles from '../styles';
import { exploreWorlds } from '../constants';
import { staggerContainer } from '../utils/motion';
import { useWorldTheme } from '../context/WorldThemeContext';
import { ExploreCard, TitleText, TypingText } from '../components';

const Explore = () => {
  const { activeWorldId, setActiveWorldId } = useWorldTheme();
  const active = activeWorldId ?? 'world-2';

  return (
    <section className={`${styles.paddings} scroll-mt-[110px]`} id="explore">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| The World" textStyles="text-center" />
        <TitleText
          title={<>Choose the world you want <br className="md:block hidden" /> to explore</>}
          textStyles="text-center"
        />
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {exploreWorlds.map((world, index) => (
            <ExploreCard
              key={world.id}
              {...world}
              index={index}
              active={active}
              handleClick={setActiveWorldId}
            />
          ))}
        </div>
        {activeWorldId && (
          <button
            type="button"
            onClick={() => setActiveWorldId(null)}
            className="self-center mt-[28px] inline-flex items-center gap-2.5 font-normal text-[14px] text-secondary-white hover:text-white transition-colors"
          >
            <span aria-hidden="true">↺</span>
            <span>Reset to the AETHER default theme</span>
          </button>
        )}
      </motion.div>
    </section>
  );
};

export default Explore;
