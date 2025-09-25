import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import SongTitle from '../components/SongTitle'

describe('SongTitle', () => {
  it('renders with title and artist', () => {
    const { container } = render(
      <SongTitle title="Test Song" artist="Test Artist" />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with only title', () => {
    const { container } = render(<SongTitle title="Test Song" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with long title and artist', () => {
    const { container } = render(
      <SongTitle 
        title="Very Long Song Title That Might Wrap" 
        artist="Very Long Artist Name That Might Also Wrap" 
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with custom className', () => {
    const { container } = render(
      <SongTitle 
        title="Test Song" 
        artist="Test Artist" 
        className="custom-style" 
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with isPlaying state', () => {
    const { container } = render(
      <SongTitle 
        title="Test Song" 
        artist="Test Artist" 
        isPlaying={true} 
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with marquee effect for long text', () => {
    const { container } = render(
      <SongTitle 
        title="This is a very long song title that should trigger marquee effect" 
        artist="This is a very long artist name that should also trigger marquee" 
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})