import React, {useState} from 'react'

const Blog = ({ blog, user, handleLikes, handleRemove }) => {
  const [expanded, setExpanded] = useState(false)

  const hideWhenExpanded = { display: expanded ? 'none' : '' }
  const showWhenExpaned = { display: expanded ? '' : 'none' }
  const id = blog.id

  return (
    <div className='blog'>
      <div style={hideWhenExpanded} onClick={() => setExpanded(!expanded)}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenExpaned} onClick={() => setExpanded(!expanded)}>
        {blog.title} {blog.author} <br />
        <a href={blog.url}>{blog.url}</a> <br />
        {blog.likes} likes <button type='button' value={id} onClick={handleLikes}>like</button> <br />
        added by {user.name} <br />
        <button type='button' value={id} onClick={handleRemove}>remove</button> <br />
      </div>
    </div>
)}

export default Blog
