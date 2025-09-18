import React from 'react';
import PlayListItem from './PlayListItem';

const Playlist = () => {
  const songs = [
    { title: "Song 1", artist: "Artist 1", length: "3:45", id: 1 },
    { title: "Song 2", artist: "Artist 2", length: "4:10", id: 2 },
    { title: "Song 3", artist: "Artist 3", length: "2:55", id: 3 },
    { title: "Song 4", artist: "Artist 4", length: "5:01", id: 4 },
  ];

  const activeSongId = 2; // This would typically come from a state variable

  return (
    <div className="w-full max-w-md">
      {songs.map((song) => (
        <PlayListItem
          key={song.id}
          title={song.title}
          artist={song.artist}
          length={song.length}
          isActive={song.id === activeSongId}
        />
      ))}
    </div>
  );
};

export default Playlist;