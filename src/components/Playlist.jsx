import React, { useState } from "react";
import PlayListItem from "./PlayListItem";

const Playlist = () => {
  const [activeSongIndex, setActiveSongIndex] = useState(0);

  const songs = [
    { title: "Painted in Blue", artist: "Soul Canvas", length: "5:55" },
    { title: "Tidal Drift", artist: "Echoes of the Sea", length: "8:02" },
    { title: "Fading Shadows", artist: "The Emberlight", length: "3:01" },
    { title: "Cosmic Drift", artist: "Solar Flare", length: "5:01" },
    { title: "Urban Serenade", artist: "Midnight Groove", length: "4:54" },
    { title: "Whispers in the Wind", artist: "Rust & Ruin", length: "6:13" },
    { title: "Electric Fever", artist: "Neon Jungle", length: "8:41" },
    { title: "Edge of the Abyss", artist: "Steel Horizon", length: "2:27" },
    { title: "Golden Haze", artist: "Velvet Waves", length: "3:15" },
    { title: "Shatter the Silence", artist: "Thunderclap Echo", length: "8:22" }
  ];

  const handleSongSelect = (index) => {
    setActiveSongIndex(index);
  };

  return (
    <div className="flex w-full flex-col border-t-4 border-custom-teal-200 dark:border-custom-teal-700 md:border-t-0 md:border-l-4 p-8 h-full overflow-y-auto">
      <h3 className="text-3xl font-black mb-8 text-custom-blue-800 dark:text-custom-blue-200 tracking-tight">
        Playlist
      </h3>
      <div className="flex w-full flex-col space-y-2">
        {songs.map((song, index) => (
          <div key={index} onClick={() => handleSongSelect(index)}>
            <PlayListItem
              title={song.title}
              artist={song.artist}
              length={song.length}
              isActive={index === activeSongIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;