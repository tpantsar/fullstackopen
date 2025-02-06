const express = require('express')
const redis = require('../redis')
const router = express.Router()

const configs = require('../util/config')

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
router.get('/statistics', async (_, res) => {
  console.log('GET /statistics')
  redis.getAsync('added_todos').then((addedTodos) => {
    res.send({ added_todos: addedTodos || 0 })
  })
})

module.exports = router
