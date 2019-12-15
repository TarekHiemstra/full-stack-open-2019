import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, users, handleLikes }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => {
          /*
          after liking or creating a blog, blog.user.id does not exists and blog.user only contains 
          the user id. It does not exist until you refresh the page, because mongoose uses the
          popuplate method.
          */
          const user = users.find(user => blog.user.id ? user.id === blog.user.id  : user.id === blog.user )
          return(
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleLikes={handleLikes}
            />
          )
        })
      }
    </div>
  )
}

export default Blogs
