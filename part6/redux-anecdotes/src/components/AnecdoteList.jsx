import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

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

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  })

  const voteAnecdote = async (id) => {
    const anecdote = anecdotes.find((a) => a.id === id)
    const updatedAnecdote = await anecdoteService.updateVotes(id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    dispatch(addVote(updatedAnecdote.id))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
  }

  // Create a new sorted array to avoid mutating the state
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => voteAnecdote(anecdote.id)}
        />
      ))}
    </>
  )
}

export default AnecdoteList
