import { useEffect, useRef, useState } from 'react'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
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

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        handleNotification(
          `${returnedBlog.author} created a new blog "${returnedBlog.title}"`,
          'success'
        )
        // Close the form after successful blog creation
        blogFormRef.current.toggleVisibility()
      })
      .catch((error) => {
        handleNotification('error creating blog', 'error')
      })
  }

  const handleBlogLike = (blog) => {
    console.log('Like clicked')
    console.log('Blog:', blog)
    blogService
      .update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      })
      .then((updatedBlog) => {
        console.log('Blog updated:', updatedBlog)
        const updatedBlogs = blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
        setBlogs(updatedBlogs)
      })
      .catch((error) => {
        console.error('Error updating blog:', error)
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
      handleNotification('login successful', 'success')
    } catch (exception) {
      handleNotification('incorrect username or password', 'error')
    }
  }

  const handleNotification = (message, type) => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 5000)
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    setUsername('')
    setPassword('')
    handleNotification('logout successful', 'success')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Log in to application</h2>
      </div>
      <Notification message={notificationMessage} type={notificationType} />
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )

  if (user === null) {
    return loginForm()
  }

  return (
    <div className="app-container">
      <Notification message={notificationMessage} type={notificationType} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>Log out</button>
      </p>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <Blogs blogs={blogs} likeBlog={handleBlogLike} />
    </div>
  )
}

export default App
