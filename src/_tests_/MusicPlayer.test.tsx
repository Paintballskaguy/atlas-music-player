import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import MusicPlayer from '../components/MusicPlayer'
import { useMusicPlayer } from '../contexts/MusicPlayerContext'
import React from 'react'

// Mock the child components to focus on MusicPlayer structure
vi.mock('../components/CurrentlyPlaying', () => ({
  default: () => <div data-testid="currently-playing">Currently Playing Component</div>
}))

vi.mock('../components/Playlist', () => ({
  default: () => <div data-testid="playlist">Playlist Component</div>
}))

// Mock the useMusicPlayer hook
vi.mock('../contexts/MusicPlayerContext', () => ({
  useMusicPlayer: vi.fn(),
}))

describe('MusicPlayer', () => {
  const mockPlaylist = [
    {
      id: '1',
      title: 'First Song',
      artist: 'Artist One',
      duration: '3:30',
      genre: 'Pop',
      cover: 'https://example.com/cover1.jpg',
      song: 'https://example.com/song1.mp3'
    },
    {
      id: '2', 
      title: 'Second Song',
      artist: 'Artist Two',
      duration: '4:15',
      genre: 'Rock',
      cover: 'https://example.com/cover2.jpg',
      song: 'https://example.com/song2.mp3'
    },
    {
      id: '3',
      title: 'Third Song', 
      artist: 'Artist Three',
      duration: '2:45',
      genre: 'Jazz',
      cover: 'https://example.com/cover3.jpg',
      song: 'https://example.com/song3.mp3'
    }
  ]

  const defaultMockContext = {
    currentSong: mockPlaylist[0],
    currentSongDetails: {
      id: '1',
      title: 'First Song',
      artist: 'Artist One',
      genre: 'Pop',
      duration: '3:30',
      cover: 'https://example.com/cover1.jpg',
      song: 'https://example.com/song1.mp3'
    },
    playlist: mockPlaylist,
    isPlaying: false,
    volume: 50,
    lyrics: null,
    playSong: vi.fn(),
    pauseSong: vi.fn(),
    nextSong: vi.fn(),
    previousSong: vi.fn(),
    setVolume: vi.fn(),
    loadLyrics: vi.fn(),
    shuffle: false,
    toggleShuffle: vi.fn(),
    repeat: false,
    toggleRepeat: vi.fn(),
    playbackSpeed: 1,
    setPlaybackSpeed: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Set default mock return value
    vi.mocked(useMusicPlayer).mockReturnValue(defaultMockContext)
  })

  it('renders music player with correct structure', () => {
    render(<MusicPlayer />)
    
    // Check that both main sections are rendered
    expect(screen.getByTestId('currently-playing')).toBeInTheDocument()
    expect(screen.getByTestId('playlist')).toBeInTheDocument()
  })

  it('applies correct CSS classes for layout', () => {
    const { container } = render(<MusicPlayer />)
    
    // Check main container has flex layout classes
    const mainDiv = container.firstChild
    expect(mainDiv).toHaveClass('flex', 'flex-col', 'md:flex-row', 'min-h-screen')
    
    // Check for styling classes
    expect(mainDiv).toHaveClass('bg-white/80', 'dark:bg-gray-800/80')
    expect(mainDiv).toHaveClass('rounded-3xl', 'shadow-2xl')
  })

  it('renders currently playing section with correct styling', () => {
    const { container } = render(<MusicPlayer />)
    
    // Find the currently playing section
    const currentlyPlayingSection = container.querySelector('[data-testid="currently-playing"]')?.parentElement
    expect(currentlyPlayingSection).toHaveClass('w-full', 'md:w-1/2')
    expect(currentlyPlayingSection).toHaveClass('bg-gradient-to-b', 'from-custom-blue-50', 'to-custom-teal-50')
  })

  it('renders playlist section with correct styling', () => {
    const { container } = render(<MusicPlayer />)
    
    // Find the playlist section  
    const playlistSection = container.querySelector('[data-testid="playlist"]')?.parentElement
    expect(playlistSection).toHaveClass('w-full', 'md:w-1/2')
    expect(playlistSection).toHaveClass('bg-white', 'dark:bg-gray-800')
  })

  it('handles different context states', () => {
    // Test with no current song
    vi.mocked(useMusicPlayer).mockReturnValue({
      ...defaultMockContext,
      currentSong: null,
      currentSongDetails: null
    })

    render(<MusicPlayer />)
    
    // Should still render both components
    expect(screen.getByTestId('currently-playing')).toBeInTheDocument()
    expect(screen.getByTestId('playlist')).toBeInTheDocument()
  })

  it('handles playing state', () => {
    vi.mocked(useMusicPlayer).mockReturnValue({
      ...defaultMockContext,
      isPlaying: true
    })

    render(<MusicPlayer />)
    
    // Components should still render regardless of playing state
    expect(screen.getByTestId('currently-playing')).toBeInTheDocument()
    expect(screen.getByTestId('playlist')).toBeInTheDocument()
  })
})