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
    console.log('isDark changed to:', isDark);
    
    // Apply dark mode class to html element
    const htmlElement = document.documentElement;
    
    if (isDark) {
      htmlElement.classList.add('dark');
      console.log('Added dark class, classes:', htmlElement.className);
    } else {
      htmlElement.classList.remove('dark');
      console.log('Removed dark class, classes:', htmlElement.className);
    }
    
    // Force a style recalculation
    htmlElement.style.colorScheme = isDark ? 'dark' : 'light';
  }, [isDark]);

  const toggleDarkMode = () => {
    console.log('toggleDarkMode called, current isDark:', isDark);
    setIsDark(prev => {
      const newValue = !prev;
      console.log('setIsDark: changing from', prev, 'to', newValue);
      return newValue;
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