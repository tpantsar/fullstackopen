import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const logReducerState = (state, action) => {
  console.log('state', JSON.parse(JSON.stringify(state)))
  console.log('action', action)
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      logReducerState(state, action)
      return action.payload
    },
    appendBlog: (state, action) => {
      logReducerState(state, action)
      state.push(action.payload)
    },
    addLike: (state, action) => {
      logReducerState(state, action)
      const id = action.payload.id
      const blogToChange = state.find((b) => b.id === id)
      blogToChange.likes += 1
    },
  },
})

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    const blogToDelete = getState().blogs.find((b) => b.id === id)
    if (
      window.confirm(
        `Remove blog '${blogToDelete.title}' by ${blogToDelete.author}?`
      )
    ) {
      try {
        await blogService.remove(id)
        const updatedBlogs = getState().blogs.filter((b) => b.id !== id)
        dispatch(setBlogs(updatedBlogs))
        dispatch(
          setNotification(
            `Blog '${blogToDelete.title}' by ${blogToDelete.author} removed`,
            'success',
            5
          )
        )
      } catch (error) {
        console.error('Error deleting blog:', error)
        dispatch(setNotification('Error deleting blog', 'error', 5))
      }
    }
  }
}

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const blogToLike = getState().blogs.find((b) => b.id === id)
    console.log('blogToLike', blogToLike)
    const updatedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    }
    console.log('updatedBlog', updatedBlog)
    try {
      const likedBlog = await blogService.update(id, updatedBlog)
      dispatch(addLike(likedBlog))
      dispatch(
        setNotification(
          `Blog '${likedBlog.title}' liked by ${likedBlog.author}`,
          'success',
          5
        )
      )
    } catch (error) {
      console.error('Error liking blog:', error)
      dispatch(setNotification('Error with blog like', 'error', 5))
    }
  }
}

export const { setBlogs, appendBlog, addLike } = blogSlice.actions
export default blogSlice.reducer
