import { useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote', anecdote.id)
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['notes'],
    queryFn: anecdoteService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  if (isPending) {
    return <div>Loading...</div>
  }

  if (isError) {
    return (
      <>
        <div>Error: {error.message}</div>
        <div>Anecdote service not available due to problems in server</div>
      </>
    )
  }

  console.log('data', data)

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
