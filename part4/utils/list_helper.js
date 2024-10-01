const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (max, blog) => (blog.likes > max.likes ? blog : max),
    blogs[0]
  )
}

const mostBlogs = (blogs) => {
  const authors = blogs.reduce((authors, blog) => {
    authors[blog.author] = authors[blog.author] + 1 || 1
    return authors
  }, {})

  const maxAuthor = Object.keys(authors).reduce(
    (max, author) =>
      authors[author] > max.blogs ? { author, blogs: authors[author] } : max,
    { author: '', blogs: 0 }
  )

  return maxAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
