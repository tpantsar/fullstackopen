import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const newAnecdote = (content) => {
  return {
    content: content,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(newAnecdote)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote: (state, action) => {
      console.log(JSON.parse(JSON.stringify(state)))
      console.log('action', action)

      state.push(newAnecdote(action.payload))
    },
    addVote: (state, action) => {
      console.log(JSON.parse(JSON.stringify(state)))
      console.log('action', action)

      const id = action.payload
      const anecdoteToChange = state.find((n) => n.id === id)
      anecdoteToChange.votes += 1
    },
  },
})

export const { createAnecdote, addVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
