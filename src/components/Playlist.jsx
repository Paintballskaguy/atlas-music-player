import React from "react";
import PlayListItem from "./PlayListItem";

const Playlist = () => {
  return (
    <div className="flex w-full flex-col border-t border-gray-300 p-6 md:w-[50%] md:border-t-0 md:border-l">
      <h3 className="text-2xl font-bold mb-6">Playlist</h3>
      <div className="flex w-full flex-col space-y-4">
        <PlayListItem
          title="Painted in Blue"
          artist="Soul Canvas"
          length="5:55"
          isActive={false}
        />
        <PlayListItem
          title="Tidal Drift"
          artist="Echoes of the Sea"
          length="8:02"
          isActive={false}
        />
        <PlayListItem
          title="Fading Shadows"
          artist="The Emberlight"
          length="3:01"
          isActive={false}
        />
        <PlayListItem
          title="Cosmic Drift"
          artist="Solar Flare"
          length="5:01"
          isActive={false}
        />
        <PlayListItem
          title="Urban Serenade"
          artist="Midnight Groove"
          length="4:54"
          isActive={false}
        />
        <PlayListItem
          title="Whispers in the Wind"
          artist="Rust & Ruin"
          length="6:13"
          isActive={false}
        />
        <PlayListItem
          title="Electric Fever"
          artist="Neon Jungle"
          length="8:41"
          isActive={false}
        />
        <PlayListItem
          title="Edge of the Abyss"
          artist="Steel Horizon"
          length="2:27"
          isActive={false}
        />
        <PlayListItem
          title="Golden Haze"
          artist="Velvet Waves"
          length="3:15"
          isActive={false}
        />
        <PlayListItem
          title="Shatter the Silence"
          artist="Thunderclap Echo"
          length="8:22"
          isActive={false}
        />
      </div>
    </div>
  );
};

export default Playlist;