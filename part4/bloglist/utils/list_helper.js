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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
