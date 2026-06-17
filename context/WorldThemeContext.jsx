'use client';

import {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';

import { exploreWorlds } from '../constants';

const DEFAULT_THEME = { accent: '#7C3AED', glow: '#22D3EE' };

const WorldThemeContext = createContext(null);

export const WorldThemeProvider = ({ children }) => {
  const [activeWorldId, setActiveWorldId] = useState(null);

  useEffect(() => {
    const world = exploreWorlds.find((item) => item.id === activeWorldId);
    const theme = world?.theme ?? DEFAULT_THEME;
    const root = document.documentElement;
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-glow', theme.glow);
  }, [activeWorldId]);

  const value = useMemo(
    () => ({ activeWorldId, setActiveWorldId }),
    [activeWorldId],
  );

  return (
    <WorldThemeContext.Provider value={value}>
      {children}
    </WorldThemeContext.Provider>
  );
};

export const useWorldTheme = () => {
  const context = useContext(WorldThemeContext);
  if (!context) {
    throw new Error('useWorldTheme must be used within a WorldThemeProvider');
  }
  return context;
};
