import { describe, it, expect, vi, beforeEach, beforeAll, afterEach, afterAll } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import MusicPlayer from '../components/MusicPlayer'
import { MusicPlayerProvider } from '../contexts/MusicPlayerContext'
import { http, HttpResponse } from 'msw'
// FIX: Import the pre-configured 'server' instance and the 'mockPlaylist' data
import { server, mockPlaylist } from './mock' 
import React from 'react'

// Note: The original mockPlaylist definition is removed from here and moved to mock.ts

// Wrapper component to provide context
const MusicPlayerWithProvider = () => (
  <MusicPlayerProvider>
    <MusicPlayer />
  </MusicPlayerProvider>
)

describe('MusicPlayer', () => {
  beforeAll(() => server.listen())
  afterEach(() => {
    server.resetHandlers()
    vi.clearAllMocks()
  })
  afterAll(() => server.close())

  beforeEach(() => {
    // Mock HTMLAudioElement methods used by the MusicPlayerContext
    window.HTMLMediaElement.prototype.play = vi.fn()
    window.HTMLMediaElement.prototype.pause = vi.fn()
    window.HTMLMediaElement.prototype.load = vi.fn()
  })

  // Helper function to reliably wait for playlist data to load/render
  const waitForPlaylistLoad = async () => {
    // We wait for a song in the Playlist component to appear, confirming the API call
    // and context state update are complete.
    await waitFor(() => {
      // We check for 'Second Song' which is a known stable element in the playlist.
      expect(screen.getByText('Second Song')).toBeInTheDocument() 
    })
  }

  it('should load and display the first song from playlist by default', async () => {
    render(<MusicPlayerWithProvider />)
    
    // Wait for the playlist to load and render
    await waitForPlaylistLoad()

    // Now verify the 'Currently Playing' section has the default (first) song
    expect(screen.getByText('First Song')).toBeInTheDocument()
    expect(screen.getByText('Artist One')).toBeInTheDocument()
    expect(screen.getByText('Pop')).toBeInTheDocument()
  })

  it('should toggle play/pause when play/pause button is clicked', async () => {
    render(<MusicPlayerWithProvider />)
    
    await waitForPlaylistLoad()

    // Find and click play button
    const playButton = screen.getByRole('button', { name: /play/i })
    fireEvent.click(playButton)

    // Verify play was called
    await waitFor(() => {
      expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled()
    })

    // Now find and click pause button (the accessible name should change to 'pause' after play)
    const pauseButton = screen.getByRole('button', { name: /pause/i })
    fireEvent.click(pauseButton)

    // Verify pause was called
    await waitFor(() => {
      expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled()
    })
  })

  it('should change to next song when forward button is clicked', async () => {
    render(<MusicPlayerWithProvider />)
    
    await waitForPlaylistLoad()

    // Click next button
    const nextButton = screen.getByRole('button', { name: /next|forward/i })
    fireEvent.click(nextButton)

    // Verify song changed to second song
    await waitFor(() => {
      expect(screen.getByText('Second Song')).toBeInTheDocument()
      expect(screen.getByText('Artist Two')).toBeInTheDocument()
      // Optional: Check that the previous song is not the current focus
      expect(screen.queryByText('Artist One')).not.toBeInTheDocument()
    })
  })

  it('should change to previous song when back button is clicked', async () => {
    render(<MusicPlayerWithProvider />)
    
    await waitForPlaylistLoad()

    // 1. Go to second song first
    const nextButton = screen.getByRole('button', { name: /next|forward/i })
    fireEvent.click(nextButton)

    await waitFor(() => {
      expect(screen.getByText('Second Song')).toBeInTheDocument()
    })

    // 2. Click previous button to go back to first song
    const prevButton = screen.getByRole('button', { name: /previous|back/i })
    fireEvent.click(prevButton)

    // Verify song changed back to first song
    await waitFor(() => {
      expect(screen.getByText('First Song')).toBeInTheDocument()
      expect(screen.getByText('Artist One')).toBeInTheDocument()
      // Optional: Check that the previous song is not the current focus
      expect(screen.queryByText('Artist Two')).not.toBeInTheDocument()
    })
  })

  it('should change current song when a song in playlist is clicked', async () => {
    render(<MusicPlayerWithProvider />)
    
    await waitForPlaylistLoad()

    // Click on the third song in the playlist
    const thirdSong = screen.getByText('Third Song')
    fireEvent.click(thirdSong)

    // Verify current song changed to the third song
    await waitFor(() => {
      expect(screen.getByText('Third Song')).toBeInTheDocument() 
      expect(screen.getByText('Artist Three')).toBeInTheDocument()
      expect(screen.getByText('Jazz')).toBeInTheDocument()
      // Optional: Check that the previous song is not the current focus
      expect(screen.queryByText('First Song')).not.toBeInTheDocument()
    })
  })

  it('should toggle playback speed when speed button is clicked', async () => {
    render(<MusicPlayerWithProvider />)
    
    await waitForPlaylistLoad()

    // Find and click speed button (Assuming the initial text/name is '1 x')
    const speedButton = screen.getByRole('button', { name: /1 x|speed/i })
    fireEvent.click(speedButton)

    // Verify speed changed (e.g., to 1.5x)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /1\.5 x|speed/i })).toBeInTheDocument()
    })

    // Click again to cycle to next speed (e.g., 2x)
    const newSpeedButton = screen.getByRole('button', { name: /1\.5 x|speed/i })
    fireEvent.click(newSpeedButton)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /2 x|speed/i })).toBeInTheDocument()
    })
  })
})