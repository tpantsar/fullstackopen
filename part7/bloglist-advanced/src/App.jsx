import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useMatch } from 'react-router-dom'
/* Components */
import BlogItemInfo from './components/BlogItemInfo'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import Notification from './components/Notification'
import User from './components/User'
import UsersTable from './components/UsersTable'
/* Reducers */
import { initBlogs } from './reducers/blogReducer'
import { initUser, logUserOut } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  const users = useSelector((state) => state.users)
  console.log('users:', users)

  const user = useSelector((state) => state.user)
  console.log('user:', user)

  const blogs = useSelector((state) => state.blogs)

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

  const userMatch = useMatch('/users/:id')
  const individualUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const individualBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  console.log('individualUser:', individualUser)
  console.log('individualBlog:', individualBlog)

  if (user === null || user === undefined || user.length === 0) {
    return <LoginForm />
  }

  return (
    <div className="app-container">
      <Menu />
      <Notification />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>Log out</button>
      </p>
      <Routes>
        <Route path="/" element={<BlogList user={user} />} />
        <Route path="/users" element={<UsersTable users={users} />} />
        <Route path="users/:id" element={<User user={individualUser} />} />
        <Route
          path="blogs/:id"
          element={<BlogItemInfo blog={individualBlog} user={user} />}
        />
      </Routes>
    </div>
  )
}

export default App
