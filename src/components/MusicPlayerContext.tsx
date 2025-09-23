import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import ApiService from '../services/api';
import { PlaylistSong, Song, MusicPlayerState, MusicPlayerContextType, RepeatMode } from '../types';

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_PLAYLIST: 'SET_PLAYLIST',
  SET_CURRENT_SONG: 'SET_CURRENT_SONG',
  SET_CURRENT_SONG_DETAILS: 'SET_CURRENT_SONG_DETAILS',
  SET_LYRICS: 'SET_LYRICS',
  SET_PLAYING: 'SET_PLAYING',
  SET_CURRENT_TIME: 'SET_CURRENT_TIME',
  SET_DURATION: 'SET_DURATION',
  SET_VOLUME: 'SET_VOLUME',
  SET_PLAYBACK_SPEED: 'SET_PLAYBACK_SPEED',
  SET_SHUFFLE: 'SET_SHUFFLE',
  SET_REPEAT: 'SET_REPEAT',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
} as const;

type ActionType = typeof ACTIONS[keyof typeof ACTIONS];

type Action = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_PLAYLIST'; payload: PlaylistSong[] }
  | { type: 'SET_CURRENT_SONG'; payload: PlaylistSong | null }
  | { type: 'SET_CURRENT_SONG_DETAILS'; payload: Song | null }
  | { type: 'SET_LYRICS'; payload: string | null }
  | { type: 'SET_PLAYING'; payload: boolean }
  | { type: 'SET_CURRENT_TIME'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_PLAYBACK_SPEED'; payload: number }
  | { type: 'SET_SHUFFLE'; payload: boolean }
  | { type: 'SET_REPEAT'; payload: RepeatMode }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: MusicPlayerState = {
  playlist: [],
  currentSong: null,
  currentSongDetails: null,
  lyrics: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 50,
  playbackSpeed: 1,
  shuffle: false,
  repeat: false,
  isLoading: true,
  error: null
};

// Reducer
function musicPlayerReducer(state: MusicPlayerState, action: Action): MusicPlayerState {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_PLAYLIST:
      return { ...state, playlist: action.payload };
    case ACTIONS.SET_CURRENT_SONG:
      return { ...state, currentSong: action.payload };
    case ACTIONS.SET_CURRENT_SONG_DETAILS:
      return { ...state, currentSongDetails: action.payload };
    case ACTIONS.SET_LYRICS:
      return { ...state, lyrics: action.payload };
    case ACTIONS.SET_PLAYING:
      return { ...state, isPlaying: action.payload };
    case ACTIONS.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    case ACTIONS.SET_DURATION:
      return { ...state, duration: action.payload };
    case ACTIONS.SET_VOLUME:
      return { ...state, volume: action.payload };
    case ACTIONS.SET_PLAYBACK_SPEED:
      return { ...state, playbackSpeed: action.payload };
    case ACTIONS.SET_SHUFFLE:
      return { ...state, shuffle: action.payload };
    case ACTIONS.SET_REPEAT:
      return { ...state, repeat: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}

interface MusicPlayerProviderProps {
  children: ReactNode;
}

// Provider component
export const MusicPlayerProvider: React.FC<MusicPlayerProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(musicPlayerReducer, initialState);

  // Load initial playlist
  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        const playlist = await ApiService.fetchPlaylist();
        dispatch({ type: ACTIONS.SET_PLAYLIST, payload: playlist });
        
        // Set first song as current if playlist exists
        if (playlist && playlist.length > 0) {
          dispatch({ type: ACTIONS.SET_CURRENT_SONG, payload: playlist[0] });
          await loadSongDetails(playlist[0].id);
        }
        
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      } catch (error) {
        dispatch({ 
          type: ACTIONS.SET_ERROR, 
          payload: error instanceof Error ? error.message : 'Unknown error occurred'
        });
      }
    };

    loadPlaylist();
  }, []);

  // Actions
  const loadSongDetails = async (songId: string): Promise<void> => {
    try {
      const songDetails = await ApiService.fetchSong(songId);
      dispatch({ type: ACTIONS.SET_CURRENT_SONG_DETAILS, payload: songDetails });
    } catch (error) {
      console.error('Failed to load song details:', error);
    }
  };

  const loadLyrics = async (songId: string): Promise<void> => {
    try {
      const lyricsData = await ApiService.fetchLyrics(songId);
      dispatch({ type: ACTIONS.SET_LYRICS, payload: lyricsData.lyrics });
    } catch (error) {
      console.error('Failed to load lyrics:', error);
    }
  };

  const selectSong = async (song: PlaylistSong): Promise<void> => {
    dispatch({ type: ACTIONS.SET_CURRENT_SONG, payload: song });
    dispatch({ type: ACTIONS.SET_PLAYING, payload: false });
    dispatch({ type: ACTIONS.SET_CURRENT_TIME, payload: 0 });
    await loadSongDetails(song.id);
    await loadLyrics(song.id);
  };

  const togglePlayPause = (): void => {
    dispatch({ type: ACTIONS.SET_PLAYING, payload: !state.isPlaying });
  };

  const getNextSong = (): PlaylistSong | null => {
    if (!state.currentSong || !state.playlist.length) return null;

    if (state.shuffle) {
      const availableSongs = state.playlist.filter(song => song.id !== state.currentSong!.id);
      if (availableSongs.length === 0) return null;
      return availableSongs[Math.floor(Math.random() * availableSongs.length)];
    }

    const currentIndex = state.playlist.findIndex(song => song.id === state.currentSong!.id);
    if (currentIndex < state.playlist.length - 1) {
      return state.playlist[currentIndex + 1];
    }
    return null;
  };

  const nextSong = (): void => {
    const nextSong = getNextSong();
    if (nextSong) {
      selectSong(nextSong);
    }
  };

  const previousSong = (): void => {
    if (!state.currentSong) return;
    
    const currentIndex = state.playlist.findIndex(song => song.id === state.currentSong!.id);
    if (currentIndex > 0) {
      const prevSong = state.playlist[currentIndex - 1];
      selectSong(prevSong);
    }
  };

  const setVolume = (volume: number): void => {
    dispatch({ type: ACTIONS.SET_VOLUME, payload: Math.max(0, Math.min(100, volume)) });
  };

  const setPlaybackSpeed = (speed: number): void => {
    dispatch({ type: ACTIONS.SET_PLAYBACK_SPEED, payload: speed });
  };

  const toggleShuffle = (): void => {
    dispatch({ type: ACTIONS.SET_SHUFFLE, payload: !state.shuffle });
  };

  const toggleRepeat = (): void => {
    const repeatModes: RepeatMode[] = [false, 'one', 'all'];
    const currentIndex = repeatModes.indexOf(state.repeat);
    const nextRepeat = repeatModes[(currentIndex + 1) % repeatModes.length];
    dispatch({ type: ACTIONS.SET_REPEAT, payload: nextRepeat });
  };

  const clearError = (): void => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  };

  const contextValue: MusicPlayerContextType = {
    ...state,
    selectSong,
    togglePlayPause,
    nextSong,
    previousSong,
    setVolume,
    setPlaybackSpeed,
    toggleShuffle,
    toggleRepeat,
    loadLyrics,
    clearError
  };

  return (
    <MusicPlayerContext.Provider value={contextValue}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

// Custom hook
export const useMusicPlayer = (): MusicPlayerContextType => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};