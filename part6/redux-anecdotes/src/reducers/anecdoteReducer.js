import { createSlice } from '@reduxjs/toolkit'

const logReducerState = (state, action) => {
  console.log(JSON.parse(JSON.stringify(state)))
  console.log('action', action)
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      logReducerState(state, action)
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      logReducerState(state, action)
      return action.payload
    },
    addVote: (state, action) => {
      logReducerState(state, action)
      const id = action.payload
      const anecdoteToChange = state.find((n) => n.id === id)
      anecdoteToChange.votes += 1
    },
  },
})

export const { createAnecdote, setAnecdotes, addVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
