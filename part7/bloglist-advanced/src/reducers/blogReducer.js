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
    addBlog: (state, action) => {
      logReducerState(state, action)
      state.push(action.payload)
    },
    removeBlog: (state, action) => {
      logReducerState(state, action)
      return state.filter((b) => b.id !== action.payload)
    },
    addLike: (state, action) => {
      logReducerState(state, action)
      const id = action.payload.id
      const blogToLike = state.find((b) => b.id === id)
      blogToLike.likes += 1
    },
    addComment: (state, action) => {
      logReducerState(state, action)
      const id = action.payload.id
      const blogToComment = state.find((b) => b.id === id)
      blogToComment.comments = action.payload.comments
    },
  },
})

export const initBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch (error) {
      console.error('Error fetching blogs:', error)
      dispatch(setNotification('Error fetching blogs', 'error', 5))
    }
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch(addBlog(newBlog))
      dispatch(
        setNotification(
          `${newBlog.author} created a new blog "${newBlog.title}"`,
          'success',
          5
        )
      )
    } catch (error) {
      console.error('Error creating blog:', error)
      dispatch(setNotification('Error creating blog', 'error', 5))
    }
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
        dispatch(removeBlog(id))
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

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    try {
      const commentedBlog = await blogService.commentBlog(id, comment)
      dispatch(addComment(commentedBlog))
      dispatch(
        setNotification(
          `Comment added to '${commentedBlog.title}' written by ${commentedBlog.author}`,
          'success',
          5
        )
      )
    } catch (error) {
      console.error('Error commenting on blog:', error)
      dispatch(setNotification('Error commenting on blog', 'error', 5))
    }
  }
}

export const { setBlogs, addBlog, removeBlog, addLike, addComment } =
  blogSlice.actions
export default blogSlice.reducer
