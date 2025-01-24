import Todo from './Todo'
import PropTypes from 'prop-types'

const TodoList = ({ todos = [], deleteTodo, completeTodo }) => {
  if (!Array.isArray(todos)) {
    return null
  }

  return (
    <>
      {todos
        .map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
          />
        ))
        .reduce((acc, cur, index) => [...acc, <hr key={index} />, cur], [])}
    </>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    })
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
}

export default TodoList
