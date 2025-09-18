import React from "react";
import CurrentlyPlaying from "./CurrentlyPlaying";
import Playlist from "./Playlist";

const MusicPlayer = () => {
  return (
    <div className="flex flex-col items-center space-y-8">
      <CurrentlyPlaying />
      <Playlist />
    </div>
  );
};

export default MusicPlayer;