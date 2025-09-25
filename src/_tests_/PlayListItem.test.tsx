import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import PlayListItem from '../components/PlayListItem'

interface PlayListItemProps {
  title: string
  artist: string
  length: string | number
  isActive?: boolean
}

describe('PlayListItem', () => {
  const defaultProps: PlayListItemProps = {
    title: 'Test Song',
    artist: 'Test Artist',
    length: '3:00',
    isActive: false,
  }

  it('renders with default props', () => {
    const { container } = render(<PlayListItem {...defaultProps} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders as active song', () => {
    const props: PlayListItemProps = {
      ...defaultProps,
      isActive: true
    }
    
    const { container } = render(<PlayListItem {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with different song data', () => {
    const props: PlayListItemProps = {
      title: 'Another Song',
      artist: 'Different Artist',
      length: '4:30',
      isActive: false
    }
    
    const { container } = render(<PlayListItem {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with numeric length (seconds)', () => {
    const props: PlayListItemProps = {
      ...defaultProps,
      length: 125 // 2 minutes 5 seconds
    }
    
    const { container } = render(<PlayListItem {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders with long title and artist', () => {
    const props: PlayListItemProps = {
      title: 'Very Long Song Title That Might Wrap Around The Container',
      artist: 'Very Long Artist Name That Might Also Wrap Around',
      length: '5:45',
      isActive: false
    }
    
    const { container } = render(<PlayListItem {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('formats duration correctly for different inputs', () => {
    // Test various duration formats
    const testCases = [
      { input: '3:30', expected: '3:30' }, // Already formatted
      { input: 125, expected: '2:05' },    // Seconds to MM:SS
      { input: '125', expected: '2:05' },  // String seconds to MM:SS
      { input: 'invalid', expected: 'invalid' } // Fallback to original
    ]

    testCases.forEach(({ input, expected }) => {
      const props: PlayListItemProps = {
        title: 'Test Song',
        artist: 'Test Artist',
        length: input,
        isActive: false
      }
      
      const { container } = render(<PlayListItem {...props} />)
      const durationElement = container.querySelector('span')
      expect(durationElement?.textContent).toBe(expected)
    })
  })

  it('applies active styling when isActive is true', () => {
    const props: PlayListItemProps = {
      ...defaultProps,
      isActive: true
    }
    
    const { container } = render(<PlayListItem {...props} />)
    const listItem = container.firstChild as HTMLElement
    
    // Check for active styling classes
    expect(listItem.className).toContain('bg-gradient-to-r')
    expect(listItem.className).toContain('border-l-4')
    expect(listItem.className).toContain('border-custom-red-500')
  })

  it('applies hover styling when not active', () => {
    const props: PlayListItemProps = {
      ...defaultProps,
      isActive: false
    }
    
    const { container } = render(<PlayListItem {...props} />)
    const listItem = container.firstChild as HTMLElement
    
    // Check for hover styling classes
    expect(listItem.className).toContain('hover:bg-custom-teal-50')
    expect(listItem.className).toContain('hover:shadow-md')
  })
})