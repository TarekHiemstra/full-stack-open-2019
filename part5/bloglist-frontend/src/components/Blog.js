import React, {useState} from 'react'

const Blog = ({ blog, user, handleLikes }) => {
  const [expanded, setExpanded] = useState(false)

  const hideWhenExpanded = { display: expanded ? 'none' : '' }
  const showWhenExpaned = { display: expanded ? '' : 'none' }

  return (
    <div className='blog'>
      <div style={hideWhenExpanded} onClick={() => setExpanded(!expanded)}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenExpaned} onClick={() => setExpanded(!expanded)}>
        {blog.title} {blog.author} <br />
        <a href={blog.url}>{blog.url}</a> <br />
        {blog.likes} likes <button type='button' value={blog.id} onClick={handleLikes}>like</button> <br />
        added by {user.name} <br />
      </div>
    </div>
)}

export default Blog
