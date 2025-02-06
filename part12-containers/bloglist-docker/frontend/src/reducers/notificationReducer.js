import { createSlice } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      console.log('state', JSON.parse(JSON.stringify(state)))
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

export const setNotification = (message, type, time = 5) => {
  console.log('message:', message)
  console.log('type:', type)

  return async (dispatch) => {
    // Clear the previous timeoutId to prevent overlapping timeouts
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    dispatch(showNotification({ message, type }))
    timeoutId = setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

setNotification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
}

export default notificationSlice.reducer
