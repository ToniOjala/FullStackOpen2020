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

const mostBlogs = blogs => {
  if (blogs.length === 0) return {}

  let authors = []

  blogs.forEach(blog => {
    const author = authors.find(author => author.name === blog.author)

    if (author) {
      author.blogs += 1
    } else {
      authors.push({
        name: blog.author,
        blogs: 1
      })
    }
  })

  let authorWithMostBlogs = authors.reduce((a, b) => {
    return (a.blogs > b.blogs) ? a : b
  })

  return authorWithMostBlogs
}

const mostLikes = blogs => {
  if (blogs.length === 0) return {}

  let authors = []

  blogs.forEach(blog => {
    const author = authors.find(author => author.name === blog.author)

    if (author) {
      author.likes += blog.likes
    } else {
      authors.push({
        name: blog.author,
        likes: blog.likes
      })
    }
  })

  let authorWithMostLikes = authors.reduce((a, b) => {
    return (a.likes > b.likes) ? a : b
  })

  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}