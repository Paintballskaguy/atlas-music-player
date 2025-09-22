import React from "react";
import coverArtImage from '../assets/placeholder.svg';

const CoverArt = () => {
  return (
    <div className="w-full aspect-square bg-gradient-to-br from-custom-teal-100 to-custom-blue-200 dark:from-custom-teal-800 dark:to-custom-blue-900 rounded-3xl overflow-hidden flex items-center justify-center shadow-2xl border-4 border-custom-yellow-200 dark:border-custom-yellow-600 transition-all duration-300">
      <div className="w-full h-full flex items-center justify-center">
        <img 
          src={coverArtImage} 
          alt="Placeholder cover art" 
          className="w-20 h-20 opacity-30 dark:opacity-50 filter drop-shadow-lg"
        />
      </div>
    </div>
  );
};

export default CoverArt;