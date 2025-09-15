import React from "react";
import { Repeat, SkipBack, Play, SkipForward, Shuffle } from 'lucide-react';

const PlayControls = () => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <button className="text-white hover:text-gray-400">
        <Repeat size={24} />
      </button>
      <button className="text-white hover:text-gray-400">
        <SkipBack size={24} />
      </button>
      <button className="text-white bg-green-500 rounded-full p-2 hover:bg-green-600">
        <Play size={32} fill="white" />
      </button>
      <button className="text-white hover:text-gray-400">
        <SkipForward size={24} />
      </button>
      <button className="text-white hover:text-gray-400">
        <Shuffle size={24} />
      </button>
    </div>
  );
};

export default PlayControls;