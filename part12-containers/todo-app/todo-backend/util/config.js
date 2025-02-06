const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL || undefined
const REDIS_URL = process.env.REDIS_URL || undefined

module.exports = {
  PORT, //: 3000,
  MONGO_URL, //: 'mongodb://the_username:the_password@localhost:3456/the_database',
  REDIS_URL, //: 'redis://localhost:6379'
}
