import { Repeat, SkipBack, Play, Pause, SkipForward, Shuffle } from 'lucide-react';
import { useMusicPlayer } from '../components/MusicPlayerContext.tsx';
import React from "react";

const PlayControls: React.FC = () => {
  const { 
    isPlaying, 
    playbackSpeed, 
    repeat, 
    shuffle,
    playlist,
    currentSong,
    togglePlayPause, 
    nextSong, 
    previousSong, 
    setPlaybackSpeed, 
    toggleRepeat,
    toggleShuffle
  } = useMusicPlayer();

  const handleSpeedClick = (): void => {
    const speeds: number[] = [0.5, 1, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
  };

  const getRepeatColor = (): string => {
    if (repeat === 'one') return 'text-custom-yellow-600 dark:text-custom-yellow-400';
    if (repeat === 'all') return 'text-custom-red-600 dark:text-custom-red-400';
    return 'text-custom-teal-600 dark:text-custom-teal-300';
  };

  const getShuffleColor = (): string => {
    return shuffle 
      ? 'text-custom-red-600 dark:text-custom-red-400' 
      : 'text-custom-teal-600 dark:text-custom-teal-300';
  };

  const isFirstSong = (): boolean => {
    if (!currentSong || !playlist.length) return true;
    return playlist.findIndex(song => song.id === currentSong.id) === 0;
  };

  const isLastSong = (): boolean => {
    if (!currentSong || !playlist.length) return true;
    return playlist.findIndex(song => song.id === currentSong.id) === playlist.length - 1;
  };

  const canGoNext = (): boolean => {
    if (shuffle) return playlist.length > 1; // Can always go next with shuffle (unless only 1 song)
    return !isLastSong();
  };

  return (
    <div className="flex items-center justify-center space-x-8">
      {/* Playback Speed */}
      <button 
        className="text-custom-teal-600 dark:text-custom-teal-300 hover:text-custom-teal-800 dark:hover:text-custom-teal-100 text-sm font-bold tracking-wider transition-all duration-200 hover:scale-110"
        onClick={handleSpeedClick}
      >
        {playbackSpeed}x
      </button>
      
      {/* Previous */}
      <button 
        className="text-custom-blue-600 dark:text-custom-blue-300 hover:text-custom-blue-800 dark:hover:text-custom-blue-100 p-2 rounded-full hover:bg-custom-blue-100 dark:hover:bg-custom-blue-800 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={previousSong}
        disabled={!currentSong || isFirstSong()}
      >
        <SkipBack size={28} strokeWidth={2} />
      </button>
      
      {/* Play/Pause Button */}
      <button 
        className="bg-gradient-to-r from-custom-red-500 to-custom-red-600 dark:from-custom-red-600 dark:to-custom-red-700 text-white rounded-2xl p-4 hover:from-custom-red-600 hover:to-custom-red-700 dark:hover:from-custom-red-700 dark:hover:to-custom-red-800 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-custom-red-400 dark:border-custom-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={togglePlayPause}
        disabled={!currentSong}
      >
        {isPlaying ? (
          <Pause size={32} strokeWidth={2} className="text-white" />
        ) : (
          <Play size={32} strokeWidth={2} className="text-white ml-1" fill="currentColor" />
        )}
      </button>
      
      {/* Next */}
      <button 
        className="text-custom-blue-600 dark:text-custom-blue-300 hover:text-custom-blue-800 dark:hover:text-custom-blue-100 p-2 rounded-full hover:bg-custom-blue-100 dark:hover:bg-custom-blue-800 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={nextSong}
        disabled={!currentSong || !canGoNext()}
      >
        <SkipForward size={28} strokeWidth={2} />
      </button>
      
      {/* Shuffle */}
      <button 
        className={`${getShuffleColor()} hover:text-custom-teal-800 dark:hover:text-custom-teal-100 p-2 rounded-full hover:bg-custom-teal-100 dark:hover:bg-custom-teal-800 transition-all duration-200 hover:scale-110`}
        onClick={toggleShuffle}
      >
        <Shuffle size={28} strokeWidth={2} />
      </button>
      
      {/* Repeat */}
      <button 
        className={`${getRepeatColor()} hover:text-custom-teal-800 dark:hover:text-custom-teal-100 p-2 rounded-full hover:bg-custom-teal-100 dark:hover:bg-custom-teal-800 transition-all duration-200 hover:scale-110 relative`}
        onClick={toggleRepeat}
      >
        <Repeat size={28} strokeWidth={2} />
        {repeat === 'one' && (
          <span className="absolute -top-1 -right-1 text-xs font-bold bg-custom-yellow-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
            1
          </span>
        )}
        {repeat === 'all' && (
          <span className="absolute -top-1 -right-1 text-xs font-bold bg-custom-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
            ∞
          </span>
        )}
      </button>
    </div>
  );
};

export default PlayControls;