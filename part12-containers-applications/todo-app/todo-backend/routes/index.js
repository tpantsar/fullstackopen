const express = require('express')
const router = express.Router()

const configs = require('../util/config')
const redis = require('../redis')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits,
  })
})

/* GET statistics data. */
router.get('/statistics', async (req, res) => {
  const addedTodos = (await redis.getAsync('added_todos')) || 0

  res.send({
    addedTodos,
  })
})

module.exports = router
