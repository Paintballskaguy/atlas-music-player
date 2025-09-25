import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import PlayListItem from '../components/PlayListItem'

describe('PlayListItem', () => {
  const defaultProps = {
    song: {
      id: '1',
      title: 'Test Song',
      artist: 'Test Artist',
      genre: 'Pop',
      duration: '3:00',
      cover: 'https://example.com/cover.jpg',
      song: 'test.mp3'
    },
    isPlaying: false,
    isCurrent: false,
    onPlay: vi.fn(),
  }

  it('renders with default props', () => {
    const { container } = render(<PlayListItem {...defaultProps} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders as currently playing song', () => {
    const props = {
      ...defaultProps,
      isCurrent: true,
      isPlaying: true
    }
    
    const { container } = render(<PlayListItem {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with different song data', () => {
    const props = {
      ...defaultProps,
      song: {
        id: '2',
        title: 'Another Song',
        artist: 'Different Artist',
        genre: 'Rock',
        duration: '4:30',
        cover: 'https://example.com/rock-cover.jpg',
        song: 'rock.mp3'
      }
    }
    
    const { container } = render(<PlayListItem {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders without cover image', () => {
    const props = {
      ...defaultProps,
      song: {
        ...defaultProps.song,
        cover: ''
      }
    }
    
    const { container } = render(<PlayListItem {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with custom className', () => {
    const { container } = render(
      <PlayListItem {...defaultProps} className="highlighted" />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})