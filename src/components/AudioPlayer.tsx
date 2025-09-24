import React, { useRef, useEffect } from 'react';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { 
    currentSongDetails, 
    isPlaying, 
    volume, 
    playbackSpeed,
    currentSong
  } = useMusicPlayer();

  // Handle play/pause based on isPlaying state
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Error playing audio:', error);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume / 100;
  }, [volume]);

  // Handle playback speed changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  // Handle song changes
  useEffect(() => {
    if (!audioRef.current) return;

    // Always reset when currentSong changes, even if no audio file yet
    audioRef.current.currentTime = 0;
    
    if (currentSongDetails?.song) {
      audioRef.current.load();
      
      // If the player is in playing state, start playing the new song
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Error playing new song:', error);
          });
        }
      }
    }
  }, [currentSong?.id, currentSongDetails?.song, isPlaying]);

  // Audio event handlers
  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    console.log('Audio loaded, duration:', audioRef.current.duration);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    // You could dispatch current time updates to context here if needed
    // dispatch({ type: 'SET_CURRENT_TIME', payload: audioRef.current.currentTime });
  };

  const handleEnded = () => {
    if (!audioRef.current) return;
    // Handle song ending - could trigger next song
    console.log('Song ended');
  };

  const handleError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    console.error('Audio error:', e);
  };

  const handleCanPlay = () => {
    if (!audioRef.current) return;
    console.log('Audio can play');
  };

  return (
    <audio
      ref={audioRef}
      src={currentSongDetails?.song || ''}
      preload="metadata"
      onLoadedMetadata={handleLoadedMetadata}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
      onError={handleError}
      onCanPlay={handleCanPlay}
      style={{ display: 'none' }} // Hide the default controls
    />
  );
};

export default AudioPlayer;