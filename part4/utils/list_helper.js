const lodash = require('lodash')

const dummy = (blogs) => {
  console.log(blogs)
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
  const authorBlogCounts = lodash.countBy(blogs, 'author')
  const authorMostBlogs = lodash.maxBy(
    lodash.keys(authorBlogCounts),
    (author) => authorBlogCounts[author]
  )

  if (!authorMostBlogs) {
    return null
  }

  return {
    author: authorMostBlogs,
    blogs: authorBlogCounts[authorMostBlogs],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
