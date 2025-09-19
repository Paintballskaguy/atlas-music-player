import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';

const VolumeControls = () => {
  const [volume, setVolume] = useState(50);

  const sliderStyle = {
    background: `linear-gradient(to right, #6B7280 0%, #6B7280 ${volume}%, #E5E7EB ${volume}%, #E5E7EB 100%)`
  };

  return (
    <div className="flex items-center space-x-3 w-full">
      <Volume2 size={20} className="text-black" />
      <div className="flex-1 relative">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={sliderStyle}
        />
      </div>
    </div>
  );
};

export default VolumeControls;