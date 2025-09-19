import React from "react";
import CurrentlyPlaying from "./CurrentlyPlaying";
import Playlist from "./Playlist";

const MusicPlayer = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Currently Playing Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <CurrentlyPlaying />
      </div>
      
      {/* Playlist Section */}
      <div className="w-full md:w-1/2">
        <Playlist />
      </div>
    </div>
  );
};

export default MusicPlayer;