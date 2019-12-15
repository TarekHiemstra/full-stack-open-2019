import React, { useState, useEffect } from 'react'
import Heading from './components/Heading'
import CurrentUser from './components/CurrentUser'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState(null)
  const blogFormRef = React.createRef()

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

 const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
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
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    blogService
      .create(blogObject)
      .then(data => {
        setMessage(`a new blog ${newTitle} by ${newAuthor} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setBlogs(blogs.concat(data))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
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
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </div> :
      <div>
        <Heading text={'blogs'} message={message} />
        <CurrentUser user={user} handleLogout={handleLogout} />
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm
            handleAdding={addBlog}
            handleTitleChange={({ target }) => setNewTitle(target.value)}
            handleAuthorChange={({ target }) => setNewAuthor(target.value)}
            handleUrlChange={({ target }) => setNewUrl(target.value)}
            title={newTitle}
            author={newAuthor}
            url={newUrl}
            blogs={blogs}
          />
        </Togglable>
        <Blogs blogs={blogs} users={users} handleLikes={handleLikes} handleRemove={handleRemove} />
      </div>
      }
    </div>
  )
}

export default App;
