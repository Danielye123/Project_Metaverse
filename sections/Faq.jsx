'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import styles from '../styles';
import { faqs } from '../constants';
import { TitleText, TypingText } from '../components';
import { staggerContainer } from '../utils/motion';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="faq" className={`${styles.paddings} relative z-10 scroll-mt-[110px]`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| FAQ" textStyles="text-center" />
        <TitleText title={<>The short answers</>} textStyles="text-center" />

        <div className="mt-[50px] flex flex-col gap-4 max-w-[800px] w-full mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={faq.question} className="rounded-[24px] bg-surface overflow-hidden">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setActiveIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between gap-4 text-left p-6"
                >
                  <span className="font-semibold sm:text-[20px] text-[16px] text-white">
                    {faq.question}
                  </span>
                  <span
                    className={`text-glow text-[28px] leading-none transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 font-normal sm:text-[16px] text-[14px] text-secondary-white leading-[26px]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Faq;
