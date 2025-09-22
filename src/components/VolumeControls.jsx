import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';

const VolumeControls = () => {
  const [volume, setVolume] = useState(50);

  const sliderStyle = {
    background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${volume}%, #e5e7eb ${volume}%, #e5e7eb 100%)`
  };

  const darkSliderStyle = {
    background: `linear-gradient(to right, #5eead4 0%, #5eead4 ${volume}%, #4b5563 ${volume}%, #4b5563 100%)`
  };

  return (
    <>
      <div className="flex items-center space-x-4 w-full">
        <div className="p-2 rounded-full bg-custom-yellow-100 dark:bg-custom-yellow-800 transition-colors duration-200">
          <Volume2 
            size={24} 
            className="text-custom-yellow-700 dark:text-custom-yellow-200" 
          />
        </div>
        <div className="flex-1 relative">
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="volume-slider w-full h-3 rounded-full appearance-none cursor-pointer transition-all duration-200 hover:scale-y-110 dark:hidden"
            style={sliderStyle}
          />
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="volume-slider w-full h-3 rounded-full appearance-none cursor-pointer transition-all duration-200 hover:scale-y-110 hidden dark:block"
            style={darkSliderStyle}
          />
        </div>
        <span className="text-sm font-bold text-custom-teal-600 dark:text-custom-teal-300 min-w-[3rem] text-right">
          {volume}%
        </span>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .volume-slider::-webkit-slider-thumb {
            appearance: none;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #dc2626;
            cursor: pointer;
            border: 3px solid white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            transition: all 0.2s ease;
          }
          
          .volume-slider::-webkit-slider-thumb:hover {
            background: #b91c1c;
            transform: scale(1.1);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
          }
          
          .volume-slider::-moz-range-thumb {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #dc2626;
            cursor: pointer;
            border: 3px solid white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            transition: all 0.2s ease;
          }
          
          .volume-slider::-moz-range-thumb:hover {
            background: #b91c1c;
            transform: scale(1.1);
          }
        `
      }} />
    </>
  );
};

export default VolumeControls;