import { createSlice } from '@reduxjs/toolkit'

const logReducerState = (state, action) => {
  console.log('state', JSON.parse(JSON.stringify(state)))
  console.log('action', action)
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterChange(state, action) {
      logReducerState(state, action)
      return action.payload
    },
  },
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer
