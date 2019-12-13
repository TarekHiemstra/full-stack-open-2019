import React from 'react'
import Notification from './Notification'

const BlogForm = ({
    handleAdding,
    handleLogout,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url,
    blogs,
    message
  }) => {

  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <div>
        {JSON.parse(loggedUserJSON).name} logged in
        <button type='button' onClick={handleLogout}>logout</button>
      </div>
      <h2>create new</h2>
      <form onSubmit={handleAdding}>
          <div>
            title:
              <input
                type="text"
                value={title}
                name="Title"
                onChange={handleTitleChange}
              />
          </div>
          <div>
            author:
              <input
                type="text"
                value={author}
                name="Author"
                onChange={handleAuthorChange}
              />
          </div>
          <div>
            url:
              <input
                type="text"
                value={url}
                name="URL"
                onChange={handleUrlChange}
              />
          </div>
          <button type="submit">create</button>
        </form>
    </div>
  )
}

export default BlogForm
