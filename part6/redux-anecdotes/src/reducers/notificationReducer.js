import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      console.log(JSON.parse(JSON.stringify(state)))
      console.log('action', action)

      return action.payload
    },
    hideNotification() {
      return ''
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions

let timeoutId

export const setNotification = (message, time) => {
  return async (dispatch) => {
    // Clear the previous timeoutId to prevent overlapping timeouts
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    dispatch(showNotification(message))
    timeoutId = setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
