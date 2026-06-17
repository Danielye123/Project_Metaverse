'use client';

import { motion } from 'framer-motion';

import { fadeIn } from '../utils/motion';

const InsightCard = ({ imgUrl, title, subtitle, category, readTime, index }) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.5, 1)}
    whileHover={{ y: -8 }}
    className="group flex md:flex-row flex-col gap-4"
  >
    <div className="md:w-[270px] w-full h-[250px] rounded-[32px] overflow-hidden shrink-0">
      <img
        src={imgUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
    <div className="w-full flex justify-between items-center">
      <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">
        <div className="flex items-center gap-3 font-normal text-[14px] text-secondary-white">
          <span className="py-1 px-3 rounded-full bg-surface text-white text-[12px]">
            {category}
          </span>
          <span>{readTime}</span>
        </div>
        <h4 className="mt-[16px] font-normal lg:text-[42px] text-[26px] text-white">
          {title}
        </h4>
        <p className="mt-[16px] font-normal lg:text-[20px] text-[14px] text-secondary-white">
          {subtitle}
        </p>
      </div>

      <div className="lg:flex hidden items-center justify-center w-[100px] h-[100px] rounded-full bg-transparent border-[1px] border-white transition-colors duration-300 group-hover:bg-accent group-hover:border-accent">
        <img
          src="/arrow.svg"
          alt=""
          className="w-[40%] h-[40%] object-contain transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </div>
  </motion.div>
);

export default InsightCard;
