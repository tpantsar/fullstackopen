const express = require('express')
const logger = require('morgan')
const cors = require('cors')

// Load environment variables
// require('dotenv').config()

const config = require('./util/config')
const indexRouter = require('./routes/index')
const todosRouter = require('./routes/todos')

const app = express()

app.use(cors())

app.use(logger('dev'))
app.use(express.json())

app.use('/', indexRouter)
app.use('/todos', todosRouter)

console.log('App started on port:', config.PORT)

module.exports = app
