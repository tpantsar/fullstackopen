/* express-async-errors package handles the try-catch blocks in routes */
const logger = require('../utils/logger')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  console.log('user:', user)
  console.log('blog:', blog)

  if (!user) {
    return response.status(401).json({ error: 'Unauthorized' })
  }
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  logger.info('blog.user:', blog.user)
  logger.info('user._id:', user._id)

  // Check if the user is the creator of the blog
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).json({ message: 'Blog successfully deleted' })
  } else {
    response.status(401).json({ error: 'Unauthorized' })
  }
})

module.exports = blogsRouter
