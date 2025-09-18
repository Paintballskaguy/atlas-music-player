import React from "react";
import coverArtImage from '../assets/placeholder.svg';

const CoverArt = () => {
  return (
    <div className="w-32rem h-20% aspect-square overflow-hidden rounded-lg">
      <img src={coverArtImage} alt="Cover Art" className="w-full h-full object-cover" />
    </div>
  );
};

export default CoverArt;