import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import CoverArt from '../components/CoverArt'
import { MusicPlayerContext } from '../contexts/MusicPlayerContext'
import React from 'react'

// Mock the useMusicPlayer hook
const mockUseMusicPlayer = vi.fn()
vi.mock('../contexts/MusicPlayerContext', () => ({
  useMusicPlayer: () => mockUseMusicPlayer(),
}))

describe('CoverArt', () => {
  const defaultMockContext = {
    currentSongDetails: null,
    lyrics: null,
    currentSong: null,
    loadLyrics: vi.fn().mockResolvedValue(undefined),
  }

  beforeEach(() => {
    mockUseMusicPlayer.mockReturnValue(defaultMockContext)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders with default state (no cover image)', () => {
    const { container } = render(<CoverArt alt="Cover Art" />)
    
    // Should show the music note fallback
    expect(container.querySelector('.bg-custom-teal-600')).toBeInTheDocument()
    expect(container.textContent).toContain('♪')
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with cover image', () => {
    mockUseMusicPlayer.mockReturnValue({
      ...defaultMockContext,
      currentSongDetails: {
        id: '1',
        title: 'Test Song',
        artist: 'Test Artist',
        genre: 'Pop',
        duration: '3:00',
        cover: 'https://example.com/cover.jpg',
        song: 'https://example.com/song.mp3'
      }
    })
    
    const { container } = render(<CoverArt alt="Test Album Cover" />)
    
    // Should show the image
    const img = container.querySelector('img')
    expect(img).toHaveAttribute('src', 'https://example.com/cover.jpg')
    expect(img).toHaveAttribute('alt', 'Test Album Cover')
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with custom alt text', () => {
    const { container } = render(<CoverArt alt="Custom Album Art" />)
    
    // The alt text should be used for the fallback (when no image)
    const img = container.querySelector('img')
    // Since there's no cover image, it will show the fallback, but the alt is still set
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with lyrics available on hover', () => {
    mockUseMusicPlayer.mockReturnValue({
      ...defaultMockContext,
      currentSongDetails: {
        id: '1',
        title: 'Test Song',
        artist: 'Test Artist',
        genre: 'Pop',
        duration: '3:00',
        cover: 'https://example.com/cover.jpg',
        song: 'https://example.com/song.mp3'
      },
      lyrics: '[Verse 1]\nTest lyrics content',
      currentSong: { id: '1', title: 'Test Song' }
    })
    
    const { container } = render(<CoverArt alt="Test Cover" />)
    
    // Lyrics panel should be hidden initially (only shown on hover)
    const lyricsPanel = container.querySelector('.bg-black.bg-opacity-80')
    expect(lyricsPanel).not.toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('handles image error by showing fallback', () => {
    mockUseMusicPlayer.mockReturnValue({
      ...defaultMockContext,
      currentSongDetails: {
        id: '1',
        title: 'Test Song',
        artist: 'Test Artist',
        genre: 'Pop',
        duration: '3:00',
        cover: 'https://invalid-url.com/cover.jpg',
        song: 'https://example.com/song.mp3'
      }
    })
    
    const { container } = render(<CoverArt alt="Test Cover" />)
    
    // Initially tries to show image
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    
    // Simulate image error
    if (img) {
      img.dispatchEvent(new Event('error'))
    }
    
    // After error, should show fallback
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with current song but no cover image', () => {
    mockUseMusicPlayer.mockReturnValue({
      ...defaultMockContext,
      currentSongDetails: null,
      currentSong: { 
        id: '1', 
        title: 'Loading Song', 
        artist: 'Loading Artist' 
      }
    })
    
    const { container } = render(<CoverArt alt="Loading Cover" />)
    
    // Should show fallback when no currentSongDetails
    expect(container.querySelector('.bg-custom-teal-600')).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('calls loadLyrics on mouse enter when current song exists', async () => {
    const mockLoadLyrics = vi.fn().mockResolvedValue(undefined)
    
    mockUseMusicPlayer.mockReturnValue({
      ...defaultMockContext,
      currentSongDetails: {
        id: '1',
        title: 'Test Song',
        artist: 'Test Artist',
        cover: 'https://example.com/cover.jpg',
        song: 'https://example.com/song.mp3'
      },
      currentSong: { id: '1', title: 'Test Song' },
      loadLyrics: mockLoadLyrics
    })
    
    const { container } = render(<CoverArt alt="Test Cover" />)
    
    // Simulate mouse enter
    const coverArtDiv = container.firstChild as HTMLElement
    coverArtDiv.dispatchEvent(new MouseEvent('mouseenter'))
    
    // Wait for async operation
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(mockLoadLyrics).toHaveBeenCalledWith('1')
    expect(container.firstChild).toMatchSnapshot()
  })
})