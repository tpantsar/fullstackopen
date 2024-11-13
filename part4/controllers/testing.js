const logger = require('../utils/logger')
const testingRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

// For testing purposes, resets the database
testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
  logger.info('Database resetted')
})

// The testing controller is used to reset the database in the testing environment
module.exports = testingRouter
