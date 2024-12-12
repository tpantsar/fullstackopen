import { useEffect, useRef, useState } from 'react'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
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

  // Fetch blogs from the server when the component is rendered
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

  const deleteBlog = (blog) => {
    console.log('Delete clicked')
    console.log('Blog:', blog)
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      blogService
        .remove(blog.id)
        .then((removedBlog) => {
          console.log('Blog removed:', removedBlog)
          const updatedBlogs = blogs.filter((b) => b.id !== blog.id)
          setBlogs(updatedBlogs)
          handleNotification(
            `Blog '${blog.title}' by ${blog.author} removed`,
            'success'
          )
        })
        .catch((error) => {
          console.error('Error deleting blog:', error)
          handleNotification('Error deleting blog', 'error')
        })
    }
  }

  const likeBlog = (blog) => {
    console.log('Like clicked')
    console.log('Blog:', blog)
    blogService
      .update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      })
      .then((updatedBlog) => {
        console.log('Blog updated:', updatedBlog)
        const updatedBlogs = blogs.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        )
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

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    setUsername('')
    setPassword('')
    handleNotification('logout successful', 'success')
  }

  const handleNotification = (message, type) => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 5000)
  }

  if (user === null) {
    return (
      <LoginForm
        handleLogin={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
        notificationMessage={notificationMessage}
        notificationType={notificationType}
      />
    )
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
      <Blogs
        blogs={blogs}
        user={user}
        likeBlog={likeBlog}
        deleteBlog={deleteBlog}
      />
    </div>
  )
}

export default App
