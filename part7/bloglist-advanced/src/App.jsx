import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
/* Components */
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
/* Reducers */
import { initBlogs } from './reducers/blogReducer'
import { initUser, logUserOut } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  // Fetch all blogs and users from the server
  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
    dispatch(initUser())
  }, [dispatch])

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logUserOut())
  }

  if (user === null || user === undefined) {
    return <LoginForm />
  }

  return (
    <div className="app-container">
      <Notification />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>Log out</button>
      </p>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm ref={blogFormRef} />
      </Togglable>
      <BlogList user={user} />
    </div>
  )
}

export default App
