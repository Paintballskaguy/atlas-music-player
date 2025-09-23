const API_BASE_URL = 'http://localhost:5173/api/v1';

class ApiService {
  async fetchPlaylist() {
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

  async fetchSong(songId) {
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

  async fetchLyrics(songId) {
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