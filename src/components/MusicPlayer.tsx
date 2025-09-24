import React from "react";
import CurrentlyPlaying from "./CurrentlyPlaying";
import Playlist from "./Playlist";

// Add this inside your MusicPlayer component:
const { isDark, toggleDarkMode } = useDarkMode();

// Add this JSX temporarily:
<div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded z-50">
  <p>Dark Mode: {isDark ? 'ON' : 'OFF'}</p>
  <button onClick={toggleDarkMode} className="bg-blue-500 px-2 py-1 rounded mt-2">
    Toggle Test
  </button>
</div>

const MusicPlayer: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-custom-teal-200 dark:border-custom-teal-700 overflow-hidden transition-all duration-300">
      {/* Currently Playing Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-b from-custom-blue-50 to-custom-teal-50 dark:from-gray-700 dark:to-gray-800">
        <CurrentlyPlaying />
      </div>
      
      {/* Playlist Section */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-800">
        <Playlist />
      </div>
    </div>
  );
};

export default MusicPlayer;