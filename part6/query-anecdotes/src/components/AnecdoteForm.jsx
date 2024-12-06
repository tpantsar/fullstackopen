import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  setNotification,
  useNotificationDispatch,
} from '../notificationFunctions'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.createNew,
    onSuccess: (newAnecdote) => {
      console.log('newAnecdote', newAnecdote)
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setNotification(`new anecdote: ${newAnecdote.content}`, dispatch)
    },
    onError: (error) => {
      console.log('error', error)
      setNotification(
        'too short anecdote, must have length 5 or more',
        dispatch
      )
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
