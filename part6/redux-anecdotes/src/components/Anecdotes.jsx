import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import PropTypes from 'prop-types'

const Anecdote = ({ anecdote, handleClick }) => (
  <div>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </div>
)

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
}

const Anecdotes = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes }) => {
    return anecdotes
  })

  // Sort anecdotes by votes
  anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(addVote(anecdote.id))}
        />
      ))}
    </>
  )
}

export default Anecdotes
