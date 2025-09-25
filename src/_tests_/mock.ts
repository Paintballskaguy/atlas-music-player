import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const mockPlaylist = [
  {
    id: '1',
    title: 'First Song',
    artist: 'Artist One',
    genre: 'Pop',
    duration: '3:30',
    cover: '/cover1.jpg',
    song: '/song1.mp3'
  },
  {
    id: '2',
    title: 'Second Song',
    artist: 'Artist Two',
    genre: 'Rock',
    duration: '4:15',
    cover: '/cover2.jpg',
    song: '/song2.mp3'
  },
  {
    id: '3',
    title: 'Third Song',
    artist: 'Artist Three',
    genre: 'Jazz',
    duration: '5:20',
    cover: '/cover3.jpg',
    song: '/song3.mp3'
  }
];

export const handlers = [
  // Change the API path to match what the test file uses: '/api/playlist'
  http.get("/api/playlist", () => {
    return HttpResponse.json(mockPlaylist);
  }),

  // Change the API path to match what the test file uses: '/api/song/:id'
  http.get("/api/song/:id", ({ params }) => {
    const song = mockPlaylist.find(s => s.id === params.id)
    if (song) {
        return HttpResponse.json(song);
    }
    return new HttpResponse(null, { status: 404 });
  }),

  // Change the API path to match what the test file uses: '/api/lyrics/:id'
  http.get("/api/lyrics/:id", () => {
    return HttpResponse.json({ lyrics: 'Test lyrics content' });
  }),
];

// Export the server instance
export const server = setupServer(...handlers);