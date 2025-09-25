import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import VolumeControls from '../components/VolumeControls'
// FIX 1: Change import from the raw Context object to the custom hook
import { useMusicPlayer } from '../contexts/MusicPlayerContext' 
import React from 'react'

// Mock Lucide React icons
vi.mock('lucide-react', () => ({
  Volume2: ({ size, className }: any) => <div data-testid="volume-icon" data-type="volume2" className={className}>Volume2Icon</div>,
  VolumeX: ({ size, className }: any) => <div data-testid="volume-icon" data-type="volumex" className={className}>VolumeXIcon</div>,
}))

// FIX 2: Mock the useMusicPlayer hook to control the values returned to the component
vi.mock('../contexts/MusicPlayerContext', () => ({
  useMusicPlayer: vi.fn(),
}))

describe('VolumeControls', () => {
  const mockSetVolume = vi.fn()
  
  const defaultContextValue = {
    volume: 50,
    setVolume: mockSetVolume,
    // Add other required context properties
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

  // FIX 3: Update the helper function to set the mock return value and render the component directly
  const renderWithContext = (contextValue = defaultContextValue) => {
    // Set the mock implementation for the hook
    vi.mocked(useMusicPlayer).mockReturnValue(contextValue)
    
    // Render the component which will now use the mocked hook result
    return render(<VolumeControls />)
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with default volume (50%)', () => {
    const { container } = renderWithContext()
    
    expect(screen.getByText('50%')).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with volume at 0% (muted)', () => {
    const contextValue = {
      ...defaultContextValue,
      volume: 0
    }
    
    const { container } = renderWithContext(contextValue)
    
    expect(screen.getByText('0%')).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with volume at 100%', () => {
    const contextValue = {
      ...defaultContextValue,
      volume: 100
    }
    
    const { container } = renderWithContext(contextValue)
    
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('calls setVolume when slider is changed', () => {
    renderWithContext()
    
    const sliders = screen.getAllByLabelText('Volume')
    const lightModeSlider = sliders[0] // First slider is for light mode
    
    fireEvent.change(lightModeSlider, { target: { value: '75' } })
    
    expect(mockSetVolume).toHaveBeenCalledWith(75)
  })

  it('toggles mute/unmute when button is clicked', () => {
    renderWithContext()
    
    const muteButton = screen.getByRole('button', { name: /mute/i })
    fireEvent.click(muteButton)
    
    expect(mockSetVolume).toHaveBeenCalledWith(0)
  })

  it('unmutes when button is clicked and volume is 0', () => {
    const contextValue = {
      ...defaultContextValue,
      volume: 0
    }
    
    renderWithContext(contextValue)
    
    const unmuteButton = screen.getByRole('button', { name: /unmute/i })
    fireEvent.click(unmuteButton)
    
    expect(mockSetVolume).toHaveBeenCalledWith(50)
  })

  it('shows VolumeX icon when volume is 0', () => {
    const contextValue = {
      ...defaultContextValue,
      volume: 0
    }
    
    renderWithContext(contextValue)
    
    const volumeIcon = screen.getByTestId('volume-icon')
    expect(volumeIcon).toHaveAttribute('data-type', 'volumex')
    expect(volumeIcon).toHaveClass('text-custom-red-600')
  })

  it('shows Volume2 icon when volume is greater than 0', () => {
    renderWithContext()
    
    const volumeIcon = screen.getByTestId('volume-icon')
    expect(volumeIcon).toHaveAttribute('data-type', 'volume2')
    expect(volumeIcon).toHaveClass('text-custom-yellow-700')
  })

  it('applies correct slider styles based on volume', () => {
    const contextValue = {
      ...defaultContextValue,
      volume: 75
    }
    
    renderWithContext(contextValue)
    
    const sliders = screen.getAllByLabelText('Volume')
    const lightModeSlider = sliders[0]
    
    // Check that the style includes the gradient with 75%
    expect(lightModeSlider.style.background).toContain('14b8a6 0%')
    expect(lightModeSlider.style.background).toContain('14b8a6 75%')
  })
})