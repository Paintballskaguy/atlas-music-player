import React from 'react';
import CoverArt from './CoverArt';
import SongTitle from './SongTitle';
import PlayControls from './PlayControls';
import VolumeControls from './VolumeControls';

const CurrentlyPlaying = () => {
  return (
    <div className="flex flex-col items-center space-y-6 p-8 max-w-md mx-auto">
      {/* Cover Art */}
      <div className="w-full max-w-80 aspect-square">
        <CoverArt />
      </div>
      
      {/* Song Information */}
      <div className="text-center space-y-2">
        <SongTitle 
          title="Painted in Blue" 
          artist="Soul Canvas" 
        />
      </div>
      
      {/* Play Controls */}
      <div className="w-full">
        <PlayControls />
      </div>
      
      {/* Volume Controls */}
      <div className="w-full">
        <VolumeControls />
      </div>
    </div>
  );
};

export default CurrentlyPlaying;