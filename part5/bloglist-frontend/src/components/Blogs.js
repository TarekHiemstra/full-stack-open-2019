import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, handleLikes }) => {
  return (
    <div>
      {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLikes={handleLikes} />
      )}
    </div>
  )
}

export default Blogs
