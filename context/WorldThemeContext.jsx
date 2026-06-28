'use client';

import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';

import { exploreWorlds } from '../constants';

const DEFAULT_THEME = { accent: '#7C3AED', glow: '#22D3EE' };
const STORAGE_KEY = 'aether-world';

const WorldThemeContext = createContext(null);

export const WorldThemeProvider = ({ children }) => {
  const [activeWorldId, setActiveWorldIdState] = useState(null);

  // Restore a persisted selection on mount (client only — avoids SSR mismatch).
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && exploreWorlds.some((world) => world.id === saved)) {
      setActiveWorldIdState(saved);
    }
  }, []);

  // Apply the active world's palette to the CSS variables (whole-site recolor).
  useEffect(() => {
    const world = exploreWorlds.find((item) => item.id === activeWorldId);
    const theme = world?.theme ?? DEFAULT_THEME;
    const root = document.documentElement;
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-glow', theme.glow);
    root.dataset.ambience = world?.ambience ?? 'stars';
  }, [activeWorldId]);

  // Persisting setter (used by consumers); restore above uses the raw state
  // setter so it never clobbers storage before the saved value is read.
  const setActiveWorldId = useCallback((id) => {
    setActiveWorldIdState(id);
    if (id) {
      window.localStorage.setItem(STORAGE_KEY, id);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const activeWorld = useMemo(
    () => exploreWorlds.find((item) => item.id === activeWorldId) ?? null,
    [activeWorldId],
  );

  const value = useMemo(
    () => ({ activeWorldId, setActiveWorldId, activeWorld }),
    [activeWorldId, setActiveWorldId, activeWorld],
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
