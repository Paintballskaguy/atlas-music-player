import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import CoverArt from '../components/CoverArt'
import { MusicPlayerContext } from '../contexts/MusicPlayerContext'

// Mock the context
const mockContextValue = {
  currentSongDetails: null,
  lyrics: null,
  currentSong: null,
  loadLyrics: vi.fn(),
  playSong: vi.fn(),
  pauseSong: vi.fn(),
  nextSong: vi.fn(),
  previousSong: vi.fn(),
  isPlaying: false,
}

const CoverArtWithContext = ({ contextValue = mockContextValue, ...props }) => (
  <MusicPlayerContext.Provider value={contextValue}>
    <CoverArt {...props} />
  </MusicPlayerContext.Provider>
)

describe('CoverArt', () => {
  it('renders with default state (no cover image)', () => {
    const { container } = render(<CoverArtWithContext />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with cover image', () => {
    const contextWithCover = {
      ...mockContextValue,
      currentSongDetails: {
        id: '1',
        title: 'Test Song',
        artist: 'Test Artist',
        cover: 'https://example.com/cover.jpg',
        song: 'test.mp3',
        genre: 'Pop',
        duration: '3:00'
      }
    }
    
    const { container } = render(
      <CoverArtWithContext 
        contextValue={contextWithCover} 
        alt="Test Album Cover" 
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with custom alt text', () => {
    const { container } = render(
      <CoverArtWithContext alt="Custom Album Art" />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with lyrics available', () => {
    const contextWithLyrics = {
      ...mockContextValue,
      currentSongDetails: {
        id: '1',
        title: 'Test Song',
        artist: 'Test Artist',
        cover: 'https://example.com/cover.jpg',
        song: 'test.mp3',
        genre: 'Pop',
        duration: '3:00'
      },
      lyrics: 'Test lyrics content'
    }
    
    const { container } = render(
      <CoverArtWithContext contextValue={contextWithLyrics} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with broken image URL', () => {
    const contextWithBrokenImage = {
      ...mockContextValue,
      currentSongDetails: {
        id: '1',
        title: 'Test Song',
        artist: 'Test Artist',
        cover: 'https://broken-url.com/image.jpg',
        song: 'test.mp3',
        genre: 'Pop',
        duration: '3:00'
      }
    }
    
    const { container } = render(
      <CoverArtWithContext contextValue={contextWithBrokenImage} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with className prop', () => {
    const { container } = render(
      <CoverArtWithContext className="custom-class" />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})