import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {
  setNotification,
  useNotificationDispatch,
} from './notificationFunctions'
import anecdoteService from './services/anecdotes'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.updateVotes,
    onSuccess: (updatedAnecdote) => {
      console.log('updatedAnecdote', updatedAnecdote)
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setNotification(`voted for '${updatedAnecdote.content}'`, dispatch)
    },
    onError: (error) => {
      console.log('error', error)
      setNotification('error voting', dispatch)
    },
  })

  const handleVote = (anecdote) => {
    console.log('anecdote', anecdote)
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    })
  }

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
