import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    // expectations here
    expect(component.container).toHaveTextContent('log in to applicationusernamepasswordlogin')
    expect(component.container).not.toHaveTextContent('blogs')
  })

  test('if user is logged in, the blog posts are rendered to the page', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }
    await localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
      <App />
    )

    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('blogs')
    )

    // expectations here
    expect(component.container).not.toHaveTextContent('log in to applicationusernamepasswordlogin')
    expect(component.container).toHaveTextContent('blogs')
  })
})
