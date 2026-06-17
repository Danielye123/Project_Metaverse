'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import styles from '../styles';
import { pricingPlans } from '../constants';
import { TitleText, TypingText } from '../components';
import { fadeIn, staggerContainer } from '../utils/motion';

const Pricing = () => {
  const [billing, setBilling] = useState('monthly');
  const isAnnual = billing === 'annual';

  return (
    <section id="pricing" className={`${styles.paddings} relative z-10 scroll-mt-[110px]`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| Plans" textStyles="text-center" />
        <TitleText title={<>Pick your altitude</>} textStyles="text-center" />

        <div className="mt-[24px] flex justify-center">
          <div className="flex items-center gap-2 p-2 rounded-full bg-surface">
            {['monthly', 'annual'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setBilling(option)}
                className={`capitalize font-medium text-[14px] py-2 px-5 rounded-full transition-colors ${
                  billing === option ? 'bg-accent text-white' : 'text-secondary-white'
                }`}
              >
                {option}
                {option === 'annual' && <span className="ml-2 text-glow">Save 25%</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-[50px] flex lg:flex-row flex-col gap-6 justify-center">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={fadeIn('up', 'spring', index * 0.3, 0.75)}
              className={`flex-1 max-w-[400px] flex flex-col rounded-[32px] p-8 ${
                plan.popular ? 'bg-surface border-[1px] border-accent' : 'glassmorphism'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[24px] text-white">{plan.title}</h3>
                {plan.popular && (
                  <span className="py-1 px-3 rounded-full bg-accent text-white text-[12px] font-medium">
                    Popular
                  </span>
                )}
              </div>
              <p className="mt-[12px] font-normal text-[14px] text-secondary-white">
                {plan.blurb}
              </p>
              <div className="mt-[24px] flex items-end gap-1">
                <span className="font-bold text-[44px] text-white">
                  ${isAnnual ? plan.annual : plan.monthly}
                </span>
                <span className="mb-[10px] font-normal text-[14px] text-secondary-white">
                  /mo
                </span>
              </div>
              <ul className="mt-[24px] flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 font-normal text-[15px] text-secondary-white"
                  >
                    <span className="mt-[8px] w-[6px] h-[6px] rounded-full bg-glow shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`mt-[32px] py-4 px-6 rounded-[32px] font-medium text-[16px] ${
                  plan.popular ? 'bg-accent text-white' : 'bg-surface text-white'
                }`}
              >
                {plan.monthly === 0 ? 'Start exploring' : `Choose ${plan.title}`}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Pricing;
