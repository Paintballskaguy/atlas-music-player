import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import SongTitle from '../components/SongTitle'

interface SongTitleProps {
  title: string
  artist?: string
  isPlaying?: boolean
  className?: string
}

describe('SongTitle', () => {
  it('renders with title and artist', () => {
    const props: SongTitleProps = {
      title: "Test Song",
      artist: "Test Artist"
    }
    
    const { container } = render(<SongTitle {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with only title', () => {
    const props: SongTitleProps = {
      title: "Test Song"
    }
    
    const { container } = render(<SongTitle {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with long title and artist', () => {
    const props: SongTitleProps = {
      title: "Very Long Song Title That Might Wrap", 
      artist: "Very Long Artist Name That Might Also Wrap"
    }
    
    const { container } = render(<SongTitle {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with custom className', () => {
    const props: SongTitleProps = {
      title: "Test Song",
      artist: "Test Artist",
      className: "custom-style"
    }
    
    const { container } = render(<SongTitle {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with isPlaying state', () => {
    const props: SongTitleProps = {
      title: "Test Song",
      artist: "Test Artist",
      isPlaying: true
    }
    
    const { container } = render(<SongTitle {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})