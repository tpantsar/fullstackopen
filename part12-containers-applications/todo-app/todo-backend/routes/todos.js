const express = require('express')
const { Todo } = require('../mongo')
const router = express.Router()

const redis = require('../redis')

/* GET statistics data. */
router.get('/statistics', async (_, res) => {
  redis.getAsync('added_todos').then((addedTodos) => {
    res.send({ added_todos: addedTodos })
  })
})

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })

  redis.getAsync('added_todos').then((addedTodos) => {
    const newCount = (parseInt(addedTodos) || 0) + 1
    redis.setAsync('added_todos', newCount)
    res.send(todo)
  })
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const body = req.body
  const todo = req.todo

  if (body.text) {
    todo.text = body.text
  }
  if (body.done !== undefined) {
    todo.done = body.done
  }

  await todo.save()
  res.send(todo)
})

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router
