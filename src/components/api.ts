import { PlaylistSong, Song, Lyrics } from '../components';

const API_BASE_URL = 'http://localhost:5173/api/v1';

class ApiService {
  async fetchPlaylist(): Promise<PlaylistSong[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/playlist`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching playlist:', error);
      throw error;
    }
  }

  async fetchSong(songId: string): Promise<Song> {
    try {
      const response = await fetch(`${API_BASE_URL}/songs/${songId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching song ${songId}:`, error);
      throw error;
    }
  }

  async fetchLyrics(songId: string): Promise<Lyrics> {
    try {
      const response = await fetch(`${API_BASE_URL}/lyrics/${songId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching lyrics for song ${songId}:`, error);
      throw error;
    }
  }
}

export default new ApiService();