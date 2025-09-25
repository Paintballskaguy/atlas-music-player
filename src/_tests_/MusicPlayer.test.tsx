import { describe, it, expect, vi, beforeEach, beforeAll, afterAll } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import MusicPlayer from '../components/MusicPlayer'
import { MusicPlayerProvider } from '../contexts/MusicPlayerContext.jsx'
import { server } from './mock' 
import React from 'react'

const MusicPlayerWithProvider = () => (
  <MusicPlayerProvider>
    <MusicPlayer />
  </MusicPlayerProvider>
)

describe('MusicPlayer', () => {
  beforeAll(() => server.listen())
  afterAll(() => server.close())

  beforeEach(() => {
    // Simple audio mocks
    window.HTMLMediaElement.prototype.play = vi.fn()
    window.HTMLMediaElement.prototype.pause = vi.fn()
  })

  const waitForLoad = async () => {
    await waitFor(() => {
      expect(screen.getByText('First Song')).toBeInTheDocument()
    })
  }

  it('renders music player components', async () => {
    render(<MusicPlayerWithProvider />)
    await waitForLoad()
    
    // Check basic structure exists
    expect(screen.getByText('First Song')).toBeInTheDocument()
    expect(screen.getByText('Artist One')).toBeInTheDocument()
  })

  it('displays playlist', async () => {
    render(<MusicPlayerWithProvider />)
    await waitForLoad()
    
    // Check all songs appear in playlist
    expect(screen.getByText('First Song')).toBeInTheDocument()
    expect(screen.getByText('Second Song')).toBeInTheDocument()
    expect(screen.getByText('Third Song')).toBeInTheDocument()
  })
})