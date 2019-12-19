import React from 'react'
import { render } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component
  const testBlog = { title: 'Test title', author: 'Test author', likes: 100 }
  const handleClick = () =>  console.log ('click!')

  beforeEach(() => {
    component = render( <SimpleBlog blog={testBlog} onclick={handleClick} /> )
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
})
