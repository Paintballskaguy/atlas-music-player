import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

export default function Footer() {
  const year = new Date().getFullYear();
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex items-center justify-between p-8">
      <div className="text-custom-teal-700 dark:text-custom-teal-300 font-medium">
        &copy; {year} Atlas School
      </div>
      
      <button
        onClick={toggleDarkMode}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-custom-yellow-100 dark:bg-custom-yellow-800 hover:bg-custom-yellow-200 dark:hover:bg-custom-yellow-700 text-custom-yellow-800 dark:text-custom-yellow-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? (
          <>
            <Sun size={20} />
            <span className="hidden sm:inline">Light</span>
          </>
        ) : (
          <>
            <Moon size={20} />
            <span className="hidden sm:inline">Dark</span>
          </>
        )}
      </button>
    </div>
  );
}