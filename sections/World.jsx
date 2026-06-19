'use client';

import { motion } from 'framer-motion';

import styles from '../styles';
import { TitleText, TypingText } from '../components';
import { fadeIn, staggerContainer } from '../utils/motion';

// Centre point of each explorer marker, as a percentage of the map (0-100) so
// the markers and the arcs that connect them stay in sync on resize.
const people = [
  { id: 1, img: '/people-01.png', x: 88, y: 74 },
  { id: 2, img: '/people-02.png', x: 20, y: 15 },
  { id: 3, img: '/people-03.png', x: 48, y: 50 },
];

// Connect every explorer to every other one.
const connections = people.flatMap((from, i) => people
  .slice(i + 1)
  .map((to) => ({ id: `${from.id}-${to.id}`, from, to })));

// A quadratic curve that bows out from the straight line between two markers.
const arcPath = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const curve = len * 0.2; // arc height as a fraction of the span
  const cx = (x1 + x2) / 2 - (dy / len) * curve;
  const cy = (y1 + y2) / 2 + (dx / len) * curve;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
};

const World = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <TypingText title="| People in the Worlds" textStyles="text-center" />
      <TitleText
        title={(
          <>See who&apos;s nearby and invite them to explore the same
            world with you
          </>
        )}
        textStyles="text-center"
      />

      <motion.div
        variants={fadeIn('up', 'tween', 0.3, 1)}
        className="relative mt-[68px] flex w-full h-[550px]"
      >
        <img src="/map.webp" loading="lazy" alt="Map of explorers around you" className="w-full h-full object-cover" />

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {connections.map(({ id, from, to }) => (
            <motion.path
              key={id}
              d={arcPath(from, to)}
              fill="none"
              className="stroke-accent"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeOpacity="0.7"
              vectorEffect="non-scaling-stroke"
              animate={{ strokeDashoffset: [12, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </svg>

        {people.map((person, index) => (
          <div
            key={person.id}
            className="absolute w-[70px] h-[70px] p-[6px] rounded-full bg-surface -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${person.x}%`, top: `${person.y}%` }}
          >
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-accent"
              animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: index * 0.6 }}
            />
            <img src={person.img} alt="Explorer nearby" className="w-full h-full" />
          </div>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

export default World;
