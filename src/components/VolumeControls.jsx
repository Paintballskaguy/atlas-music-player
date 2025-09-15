import React from 'react';
import { Volume2 } from 'lucide-react';

const VolumeControls = () => {
  return (
    <div className="flex items-center space-x-2 w-full">
      <Volume2 size={20} className="text-gray-400" />
      <input type="range" className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
    </div>
  );
};

export default VolumeControls;