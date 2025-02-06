const mongoose = require('mongoose')

const Blog = require('./models/blog')
const User = require('./models/user')

const config = require('../utils/config')
const logger = require('../utils/logger')

const MONGO_URL = config.MONGODB_URI

if (MONGO_URL && !mongoose.connection.readyState) {
  mongoose.set('strictQuery', false)
  logger.info('connecting to', MONGO_URL)

  mongoose.connect(MONGO_URL)

  mongoose.connection.once('open', () => {
    console.log('Successfully connected to MongoDB')
  })

  mongoose.connection.on('error', (error) => {
    console.log('Error connecting to MongoDB:', error)
  })
}

module.exports = {
  Blog,
  User,
}
