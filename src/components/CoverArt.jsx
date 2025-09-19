import React from "react";
import coverArtImage from '../assets/placeholder.svg';

const CoverArt = () => {
  return (
    <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <img 
          src={coverArtImage} 
          alt="Placeholder cover art" 
          className="w-16 h-16 opacity-40"
        />
      </div>
    </div>
  );
};

export default CoverArt;