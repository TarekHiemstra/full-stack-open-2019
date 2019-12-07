const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accu, curr) => accu + curr.likes, 0) || 0
}

const favoriteBlog = (blogs) => {
  const topBlog = blogs.reduce((a, c) => c.likes > a.likes ? c : a)
  // Omit the the 3 properties '_id', 'url' and '__v'
  const { _id, url, __v, ...topBlog3 } = topBlog
  return topBlog3
}

const mostBlogs = (blogs) => {
  const authorWithMostBlogs = _
    .chain(blogs)
    .countBy('author')
    .map((blogs, author) => ({ author, blogs }))
    .sortBy('blogs')
    .last()
    .value()
  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  const authorWithMostLikes = _
    .chain(blogs)
    .groupBy('author')
    .map((obj, key) => ({ 'author': key, 'likes': _.sumBy(obj, 'likes') }))
    .sortBy('likes')
    .last()
    .value()
  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
