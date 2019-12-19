import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component
  let mockHandler
  const testBlog = { title: 'Test title', author: 'Test author', likes: 100 }

  beforeEach(() => {
    mockHandler = jest.fn()
    component = render( <SimpleBlog blog={testBlog} onClick={mockHandler} /> )
  })

  test('renders the title', () => {
    const div = component.container.querySelector('.title-author')
    expect(div).toHaveTextContent('Test title')
  })

  test('renders the author', () => {
    const div = component.container.querySelector('.title-author')
    expect(div).toHaveTextContent('Test author')
  })

  test('renders the likes', () => {
    const div = component.container.querySelector('.likes')
    expect(div).toHaveTextContent('blog has 100 likes')
  })

  test('clicking the button twice calls event handler twice', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
