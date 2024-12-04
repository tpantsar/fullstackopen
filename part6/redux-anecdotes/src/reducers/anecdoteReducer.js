import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const logReducerState = (state, action) => {
  console.log('state', JSON.parse(JSON.stringify(state)))
  console.log('action', action)
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes: (state, action) => {
      logReducerState(state, action)
      return action.payload
    },
    appendAnecdote: (state, action) => {
      logReducerState(state, action)
      state.push(action.payload)
    },
    addVote: (state, action) => {
      logReducerState(state, action)
      const id = action.payload.id
      const anecdoteToChange = state.find((n) => n.id === id)
      anecdoteToChange.votes += 1
    },
  },
})

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToChange = getState().anecdotes.find((a) => a.id === id)
    const updatedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    }
    console.log('updatedAnecdote', updatedAnecdote)
    const votedAnecdote = await anecdoteService.updateVotes(id, updatedAnecdote)
    dispatch(addVote(votedAnecdote))
  }
}

export const { appendAnecdote, setAnecdotes, addVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
