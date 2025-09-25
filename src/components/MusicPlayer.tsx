import React from "react";
import CurrentlyPlaying from "./CurrentlyPlaying";
import Playlist from "./Playlist";

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