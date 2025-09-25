import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import VolumeControl from '../components/VolumeControl'

describe('VolumeControl', () => {
  const defaultProps = {
    volume: 50,
    onVolumeChange: vi.fn(),
  }

  it('renders with default volume', () => {
    const { container } = render(<VolumeControl {...defaultProps} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with minimum volume (0)', () => {
    const props = { ...defaultProps, volume: 0 }
    const { container } = render(<VolumeControl {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with maximum volume (100)', () => {
    const props = { ...defaultProps, volume: 100 }
    const { container } = render(<VolumeControl {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with muted state', () => {
    const props = { ...defaultProps, volume: 0, isMuted: true }
    const { container } = render(<VolumeControl {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with custom className', () => {
    const { container } = render(
      <VolumeControl {...defaultProps} className="custom-volume" />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with different volume levels', () => {
    const volumes = [25, 75, 33, 67]
    
    volumes.forEach(volume => {
      const props = { ...defaultProps, volume }
      const { container } = render(<VolumeControl {...props} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })

  it('renders with showLabel prop', () => {
    const { container } = render(
      <VolumeControl {...defaultProps} showLabel={true} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with custom size', () => {
    const { container } = render(
      <VolumeControl {...defaultProps} size="small" />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})