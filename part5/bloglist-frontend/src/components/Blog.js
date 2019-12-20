import React, { useState } from 'react'

const Blog = ({ blog, user, handleLikes, handleRemove }) => {
  const [expanded, setExpanded] = useState(false)
  const hideWhenExpanded = { display: expanded ? 'none' : '' }
  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const id = blog.id
  const currentUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

  return (
    <div className='blog' onClick={() => setExpanded(!expanded)}>
      <div style={hideWhenExpanded}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenExpanded}>
        {blog.title} {blog.author} <br />
        <a href={blog.url}>{blog.url}</a> <br />
        {blog.likes} likes <button type='button' value={id} onClick={handleLikes}>like</button> <br />
        added by {user.name} <br />
        {
          currentUser.username === user.username &&
        <button type='button' value={id} onClick={handleRemove}>remove</button>
        }
      </div>
    </div>
  )}

export default Blog
