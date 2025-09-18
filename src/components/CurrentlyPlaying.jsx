import React from 'react';
import CoverArt from './CoverArt';
import SongTitle from './SongTitle';
import PlayControls from './PlayControls';
import VolumeControls from './VolumeControls';

const CurrentlyPlaying = () => {
  return (
    <div className="flex flex-col items-center space-y-8">
      <CoverArt />
      <SongTitle title="A Starry Night" artist="The Luminary Echoes" />
      <PlayControls />
      <VolumeControls />
    </div>
  );
};

export default CurrentlyPlaying;