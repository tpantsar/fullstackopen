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
router.get('/statistics', async (_, res) => {
  console.log('GET /statistics')
  redis.getAsync('added_todos').then((addedTodos) => {
    res.send({ added_todos: addedTodos })
  })
})

module.exports = router
