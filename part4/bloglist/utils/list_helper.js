const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accu, curr) => accu + curr.likes, 0) || 0
}

module.exports = {
  dummy,
  totalLikes
}
