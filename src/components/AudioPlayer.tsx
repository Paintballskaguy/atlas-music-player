import React, { useRef, useEffect, useCallback } from 'react';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { 
    currentSongDetails, 
    isPlaying, 
    volume, 
    playbackSpeed,
    currentSong,
    repeat,
    nextSong
  } = useMusicPlayer();

  // Handle play/pause based on isPlaying state
  useEffect(() => {
    if (!audioRef.current || !currentSongDetails?.song) return;

    const audio = audioRef.current;

    if (isPlaying) {
      // Check if audio is ready to play
      if (audio.readyState >= 2) { // HAVE_CURRENT_DATA
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Error playing audio:', error);
            // Could dispatch an error to context here
          });
        }
      } else {
        // Wait for audio to be ready
        const handleCanPlay = () => {
          audio.play().catch(error => {
            console.error('Error playing audio after canplay:', error);
          });
          audio.removeEventListener('canplay', handleCanPlay);
        };
        audio.addEventListener('canplay', handleCanPlay);
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSongDetails?.song]);

  // Handle volume changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = Math.max(0, Math.min(1, volume / 100));
  }, [volume]);

  // Handle playback speed changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = Math.max(0.25, Math.min(4, playbackSpeed));
  }, [playbackSpeed]);

  // Handle song changes
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    
    // Reset time when song changes
    audio.currentTime = 0;
    
    if (currentSongDetails?.song) {
      // Set new source and load
      audio.src = currentSongDetails.song;
      audio.load();
      
      // If should be playing, play when ready
      if (isPlaying) {
        const handleCanPlay = () => {
          audio.play().catch(error => {
            console.error('Error playing new song:', error);
          });
          audio.removeEventListener('canplay', handleCanPlay);
        };
        
        if (audio.readyState >= 2) {
          audio.play().catch(error => {
            console.error('Error playing new song (immediate):', error);
          });
        } else {
          audio.addEventListener('canplay', handleCanPlay);
        }
      }
    }
  }, [currentSong?.id, currentSongDetails?.song]);

  // Audio event handlers
  const handleLoadedMetadata = useCallback(() => {
    if (!audioRef.current) return;
    console.log('Audio loaded, duration:', audioRef.current.duration);
    // You could dispatch duration to context here if needed
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (!audioRef.current) return;
    // You could dispatch current time updates to context here if needed
    // dispatch({ type: 'SET_CURRENT_TIME', payload: audioRef.current.currentTime });
  }, []);

  const handleEnded = useCallback(() => {
    console.log('Song ended');
    
    // Handle repeat modes
    if (repeat === 'one' && audioRef.current) {
      // Replay current song
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error('Error replaying song:', error);
      });
    } else if (repeat === 'all' || repeat === false) {
      // Go to next song (nextSong handles repeat logic)
      nextSong();
    }
  }, [repeat, nextSong]);

  const handleError = useCallback((e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const audio = e.currentTarget;
    console.error('Audio error:', {
      error: audio.error,
      networkState: audio.networkState,
      readyState: audio.readyState,
      src: audio.src
    });
    
    // You could dispatch error to context here
    // dispatch({ type: 'SET_ERROR', payload: 'Failed to load audio' });
  }, []);

  const handleCanPlay = useCallback(() => {
    if (!audioRef.current) return;
    console.log('Audio can play - ready state:', audioRef.current.readyState);
  }, []);

  const handleLoadStart = useCallback(() => {
    console.log('Audio load started');
  }, []);

  const handleLoadedData = useCallback(() => {
    console.log('Audio data loaded');
  }, []);

  const handleWaiting = useCallback(() => {
    console.log('Audio waiting for data');
  }, []);

  const handlePlaying = useCallback(() => {
    console.log('Audio playing');
  }, []);

  const handlePause = useCallback(() => {
    console.log('Audio paused');
  }, []);

  return (
    <audio
      ref={audioRef}
      preload="metadata"
      onLoadedMetadata={handleLoadedMetadata}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
      onError={handleError}
      onCanPlay={handleCanPlay}
      onLoadStart={handleLoadStart}
      onLoadedData={handleLoadedData}
      onWaiting={handleWaiting}
      onPlaying={handlePlaying}
      onPause={handlePause}
      style={{ display: 'none' }}
    />
  );
};

export default AudioPlayer;