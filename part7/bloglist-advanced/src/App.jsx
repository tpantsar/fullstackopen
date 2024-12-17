import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
/* Components */
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
/* Services */
import blogService from './services/blogs'
import loginService from './services/login'
/* Reducers */
import { initBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Fetch blogs from the server when the component is rendered
  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        dispatch(
          setNotification(
            `${returnedBlog.author} created a new blog "${returnedBlog.title}"`,
            'success',
            5
          )
        )
        // Close the form after successful blog creation
        blogFormRef.current.toggleVisibility()
      })
      .catch((error) => {
        console.log('Error creating blog:', error)
        dispatch(setNotification('error creating blog', 'error', 5))
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      console.log(user)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification('login successful', 'success', 5))
    } catch (exception) {
      dispatch(setNotification('incorrect username or password', 'error', 5))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    setUsername('')
    setPassword('')
    dispatch(setNotification('logout successful', 'success', 5))
  }

  if (user === null) {
    return (
      <LoginForm
        handleLogin={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
      />
    )
  }

  return (
    <div className="app-container">
      <Notification />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>Log out</button>
      </p>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <BlogList user={user} />
    </div>
  )
}

export default App
