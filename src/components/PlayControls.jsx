import React, { useState } from "react";
import { Repeat, SkipBack, Play, Pause, SkipForward } from 'lucide-react';

const PlayControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center justify-center space-x-6">
      {/* Playback Speed */}
      <button className="text-black hover:text-gray-600 text-sm font-medium">
        1x
      </button>
      
      {/* Previous */}
      <button 
        className="text-black hover:text-gray-600"
        onClick={() => {}}
      >
        <SkipBack size={24} />
      </button>
      
      {/* Play/Pause Button */}
      <button 
        className="bg-black text-white rounded-lg p-3 hover:bg-gray-800 transition-colors"
        onClick={handlePlayPause}
      >
        {isPlaying ? (
          <Pause size={28} fill="white" />
        ) : (
          <Play size={28} fill="white" />
        )}
      </button>
      
      {/* Next */}
      <button 
        className="text-black hover:text-gray-600"
        onClick={() => {}}
      >
        <SkipForward size={24} />
      </button>
      
      {/* Repeat */}
      <button className="text-black hover:text-gray-600">
        <Repeat size={24} />
      </button>
    </div>
  );
};

export default PlayControls;