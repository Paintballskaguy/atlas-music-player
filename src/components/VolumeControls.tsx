// src/components/VolumeControls.tsx
import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';

const VolumeControls: React.FC = () => {
  const { volume, setVolume } = useMusicPlayer();

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVolume(parseInt(e.target.value));
  };

  const toggleMute = (): void => {
    setVolume(volume > 0 ? 0 : 50);
  };

  const sliderStyle: React.CSSProperties = {
    background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${volume}%, #e5e7eb ${volume}%, #e5e7eb 100%)`
  };

  const darkSliderStyle: React.CSSProperties = {
    background: `linear-gradient(to right, #5eead4 0%, #5eead4 ${volume}%, #4b5563 ${volume}%, #4b5563 100%)`
  };

  return (
    <>
      <div className="flex items-center space-x-4 w-full">
        <button 
          onClick={toggleMute}
          className="p-2 rounded-full bg-custom-yellow-100 dark:bg-custom-yellow-800 hover:bg-custom-yellow-200 dark:hover:bg-custom-yellow-700 transition-all duration-200 hover:scale-110"
          aria-label={volume > 0 ? 'Mute' : 'Unmute'}
        >
          {volume > 0 ? (
            <Volume2 
              size={24} 
              className="text-custom-yellow-700 dark:text-custom-yellow-200" 
            />
          ) : (
            <VolumeX 
              size={24} 
              className="text-custom-red-600 dark:text-custom-red-400" 
            />
          )}
        </button>
        
        <div className="flex-1 relative">
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider w-full h-3 rounded-full appearance-none cursor-pointer transition-all duration-200 hover:scale-y-110 dark:hidden"
            style={sliderStyle}
            aria-label="Volume"
          />
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider w-full h-3 rounded-full appearance-none cursor-pointer transition-all duration-200 hover:scale-y-110 hidden dark:block"
            style={darkSliderStyle}
            aria-label="Volume"
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
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
          }
        `
      }} />
    </>
  );
};

export default VolumeControls;