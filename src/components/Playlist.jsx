import React from "react";
import PlayListItem from "./PlayListItem";
import { useMusicPlayer } from '../contexts/MusicPlayerContext';

const Playlist = () => {
  const { playlist, currentSong, selectSong } = useMusicPlayer();

  const handleSongSelect = (song) => {
    selectSong(song);
  };

  if (!playlist || playlist.length === 0) {
    return (
      <div className="flex w-full flex-col border-t-4 border-custom-teal-200 dark:border-custom-teal-700 md:border-t-0 md:border-l-4 p-8 h-full overflow-y-auto">
        <h3 className="text-3xl font-black mb-8 text-custom-blue-800 dark:text-custom-blue-200 tracking-tight">
          Playlist
        </h3>
        <div className="flex items-center justify-center h-64">
          <p className="text-custom-teal-600 dark:text-custom-teal-400 text-lg">
            No songs available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col border-t-4 border-custom-teal-200 dark:border-custom-teal-700 md:border-t-0 md:border-l-4 p-8 h-full overflow-y-auto">
      <h3 className="text-3xl font-black mb-8 text-custom-blue-800 dark:text-custom-blue-200 tracking-tight">
        Playlist
      </h3>
      <div className="flex w-full flex-col space-y-2">
        {playlist.map((song) => (
          <div key={song.id} onClick={() => handleSongSelect(song)}>
            <PlayListItem
              title={song.title}
              artist={song.artist}
              length={song.duration}
              isActive={currentSong && currentSong.id === song.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;