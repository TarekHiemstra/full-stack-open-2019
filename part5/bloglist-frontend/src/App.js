import React, { useState, useEffect } from 'react'
import  { useField } from './hooks'
import Heading from './components/Heading'
import CurrentUser from './components/CurrentUser'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  // State hooks
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = React.createRef()

  // Effect hooks
  useEffect(() => {
    blogService.getAllUsers().then(users => { setUsers(users) })
    blogService.getAll().then(initialBlogs => { setBlogs(initialBlogs) })

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Custom hooks
  const username = useField('text', 'Username')
  const password = useField('password', 'Password')
  const title = useField('text', 'Title')
  const author = useField('text', 'Author')
  const url = useField('text', 'Url')

  // Handlers
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    blogService
      .create(blogObject)
      .then(data => {
        setMessage(`a new blog ${title.value} by ${author.value} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setBlogs(blogs.concat(data))
      })
  }

  const handleLikes = (event) => {
    event.preventDefault()
    const id = event.target.value
    const blog = blogs.find(n => n.id === id)
    const changedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user // Now it will also work after adding a new blog or after liking a blog
    }
    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  const handleRemove = (event) => {
    event.preventDefault()
    const id = event.target.value
    const blog = blogs.find(n => n.id === id)
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(id)
      // eslint-disable-next-line no-unused-vars
        .catch(error => {
          setBlogs(blogs.filter(n => n.id !== id))
        })
      setBlogs(blogs.filter(n => n.id !== id))
    }
  }

  return (
    <div>
      {user === null ?
        <div>
          <Heading text={'log in to application'} message={message} />
          <LoginForm handleLogin={handleLogin} username={username} password={password} />
        </div> :
        <div>
          <Heading text={'blogs'} message={message} />
          <CurrentUser user={user} handleLogout={handleLogout} />
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm handleAdding={addBlog} title={title} author={author} url={url} />
          </Togglable>
          <Blogs blogs={blogs} users={users} handleLikes={handleLikes} handleRemove={handleRemove} />
        </div>
      }
    </div>
  )
}

export default App
