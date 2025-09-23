export interface PlaylistSong {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  cover: string;
  song: string;
}

export interface Lyrics {
  lyrics: string;
}

export type RepeatMode = false | 'one' | 'all';

export interface MusicPlayerState {
  playlist: PlaylistSong[];
  currentSong: PlaylistSong | null;
  currentSongDetails: Song | null;
  lyrics: string | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackSpeed: number;
  shuffle: boolean;
  repeat: RepeatMode;
  isLoading: boolean;
  error: string | null;
}

export interface MusicPlayerContextType extends MusicPlayerState {
  selectSong: (song: PlaylistSong) => Promise<void>;
  togglePlayPause: () => void;
  nextSong: () => void;
  previousSong: () => void;
  setVolume: (volume: number) => void;
  setPlaybackSpeed: (speed: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  loadLyrics: (songId: string) => Promise<void>;
  clearError: () => void;
}