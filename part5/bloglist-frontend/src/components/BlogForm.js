import React from 'react'

const BlogForm = ({
  handleAdding,
  title,
  author,
  url,
}) => {

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAdding}>
        <div>
            title:
          <input {...title.fieldValues()} />
        </div>
        <div>
            author:
          <input {...author.fieldValues()} />
        </div>
        <div>
            url:
          <input {...url.fieldValues()} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
