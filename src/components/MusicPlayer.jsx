import React from "react";
import PlayListItem from "./PlayListItem";

const Playlist = () => {
  return (
    <div className="flex w-full flex-col border-t border-gray-300 p-6 md:w-[50%] md:border-t-0 md:border-l">
      <h3 className="text-lg font-semibold">Playlist</h3>
      <div className="mt-4 flex w-full flex-col gap-1 pr-4">
        <PlayListItem
          title="Painted in Blue"
          artist="Soul Canvas"
          length="5:55"
          isActive={true}
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
      </div>
    </div>
  );
};

export default Playlist;