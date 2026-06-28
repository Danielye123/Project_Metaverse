'use client';

import { AnimatePresence } from 'framer-motion';

import { useWorldTheme } from '../context/WorldThemeContext';
import AuroraWaves from './AuroraWaves';

// DOM-based ambience layers (the canvas Starfield handles the particle effects).
const WorldAmbienceDom = () => {
  const { activeWorld } = useWorldTheme();

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {activeWorld?.ambience === 'aurora' && <AuroraWaves key="aurora" />}
      </AnimatePresence>
    </div>
  );
};

export default WorldAmbienceDom;
