import { forwardRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import '../styles/BlogForm.css'

const BlogForm = forwardRef((_props, ref) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreate = (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url,
    }
    console.log('create new blog:', blogObject)
    dispatch(createBlog(blogObject))

    // Close the form after successful blog creation
    ref.current.toggleVisibility()

    // Reset form fields
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="blog-form-container">
      <h3>New blog</h3>
      <form onSubmit={handleBlogCreate}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Title"
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Author"
          />
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            type="text"
            id="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="Url"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
})

BlogForm.displayName = 'BlogForm'
export default BlogForm
