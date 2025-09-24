import React, { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

export const DarkModeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply dark mode class to html element
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Remove the system preference listener - it's interfering with manual toggles

  const toggleDarkMode = () => {
    console.log('toggleDarkMode called, current isDark:', isDark); // Debug log
    setIsDark(prev => {
      console.log('setIsDark: changing from', prev, 'to', !prev); // Debug log
      return !prev;
    });
  };

  const value = {
    isDark,
    toggleDarkMode,
    setIsDark
  };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext };