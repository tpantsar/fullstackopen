require('dotenv').config()

const PORT = process.env.PORT || 3001

const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI
const MONGODB_URI = process.env.NODE_ENV === 'test' ? TEST_MONGODB_URI : process.env.MONGODB_URI

const SECRET = process.env.SECRET

const NODE_ENV = process.env.NODE_ENV

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET,
  NODE_ENV,
}
