import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const logReducerState = (state, action) => {
  console.log('state', JSON.parse(JSON.stringify(state)))
  console.log('action', action)
}

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setUser: (state, action) => {
      logReducerState(state, action)
      return action.payload
    },
  },
})

export const initUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const logUserIn = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      console.log('user:', user)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setNotification('Login successful', 'success', 5))
    } catch (exception) {
      dispatch(setNotification('Incorrect username or password', 'error', 5))
    }
  }
}

export const logUserOut = () => {
  return async (dispatch) => {
    try {
      window.localStorage.removeItem('loggedBlogUser')
      dispatch(setUser(null))
      dispatch(setNotification('Logout successful', 'success', 5))
    } catch (exception) {
      dispatch(setNotification('Error logging out', 'error', 5))
    }
  }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
