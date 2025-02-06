const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const { MONGO_URL } = require('../util/config')

if (MONGO_URL && !mongoose.connection.readyState) {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  mongoose.connection.once('open', () => {
    console.log('Successfully connected to MongoDB')
  })

  mongoose.connection.on('error', (error) => {
    console.log('Error connecting to MongoDB:', error)
  })
}

module.exports = {
  Todo,
}
