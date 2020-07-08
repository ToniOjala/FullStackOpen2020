const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  let sum = 0

  blogs.forEach(blog => {
    sum += blog.likes
  });

  return sum
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) return {}

  let mostLiked = blogs.reduce((a, b) => {
    return (a.likes > b.likes) ? a : b
  })

  delete mostLiked._id
  delete mostLiked.__v
  delete mostLiked.url

  return mostLiked
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}