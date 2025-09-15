import React from "react";
import CoverArt from "./CoverArt";
import SongTitle from "./SongTitle";
import PlayControls from "./PlayControls";
import VolumeControls from "./VolumeControls";
import PlayListItem from "./PlayListItem";

const MusicPlayer = () => {
  return (
    <div className="flex flex-col items-center space-y-8">
      {/* This is a single music player, which can be part of the larger app */}
      <CoverArt />
      <SongTitle title="Song Title" artist="Artist Name" />
      <PlayControls />
      <VolumeControls />
      
      {/* You might want a playlist section here */}
      <div className="w-full max-w-md">
        <PlayListItem title="Song 1" artist="Artist 1" length="3:45" />
        <PlayListItem title="Song 2" artist="Artist 2" length="4:10" />
        <PlayListItem title="Song 3" artist="Artist 3" length="2:55" />
      </div>
    </div>
  );
};

export default MusicPlayer;