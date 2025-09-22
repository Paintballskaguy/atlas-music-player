import React, { useState } from "react";
import { Repeat, SkipBack, Play, Pause, SkipForward } from 'lucide-react';

const PlayControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center justify-center space-x-8">
      {/* Playback Speed */}
      <button className="text-custom-teal-600 dark:text-custom-teal-300 hover:text-custom-teal-800 dark:hover:text-custom-teal-100 text-sm font-bold tracking-wider transition-all duration-200 hover:scale-110">
        1x
      </button>
      
      {/* Previous */}
      <button 
        className="text-custom-blue-600 dark:text-custom-blue-300 hover:text-custom-blue-800 dark:hover:text-custom-blue-100 p-2 rounded-full hover:bg-custom-blue-100 dark:hover:bg-custom-blue-800 transition-all duration-200 hover:scale-110"
        onClick={() => {}}
      >
        <SkipBack size={28} />
      </button>
      
      {/* Play/Pause Button */}
      <button 
        className="bg-gradient-to-r from-custom-red-500 to-custom-red-600 dark:from-custom-red-600 dark:to-custom-red-700 text-white rounded-2xl p-4 hover:from-custom-red-600 hover:to-custom-red-700 dark:hover:from-custom-red-700 dark:hover:to-custom-red-800 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-custom-red-400 dark:border-custom-red-500"
        onClick={handlePlayPause}
      >
        {isPlaying ? (
          <Pause size={32} className="text-white" />
        ) : (
          <Play size={32} className="text-white ml-1" />
        )}
      </button>
      
      {/* Next */}
      <button 
        className="text-custom-blue-600 dark:text-custom-blue-300 hover:text-custom-blue-800 dark:hover:text-custom-blue-100 p-2 rounded-full hover:bg-custom-blue-100 dark:hover:bg-custom-blue-800 transition-all duration-200 hover:scale-110"
        onClick={() => {}}
      >
        <SkipForward size={28} />
      </button>
      
      {/* Repeat */}
      <button className="text-custom-teal-600 dark:text-custom-teal-300 hover:text-custom-teal-800 dark:hover:text-custom-teal-100 p-2 rounded-full hover:bg-custom-teal-100 dark:hover:bg-custom-teal-800 transition-all duration-200 hover:scale-110">
        <Repeat size={28} />
      </button>
    </div>
  );
};

export default PlayControls;