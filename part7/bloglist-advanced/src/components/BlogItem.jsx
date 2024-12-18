import { Link as MuiLink } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import '../styles/Blog.css'

const BlogItem = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [detailsVisible, setDetailsVisible] = useState(false)

  // Whether logged user is the author of the blog.
  // Used to show/hide the delete button.
  let isAuthor = false
  if (blog.user) {
    isAuthor = user && user.username === blog.user.username
    console.log(user.username, blog.user.username, isAuthor)
  }

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const handleDelete = (blog) => {
    console.log('Delete clicked')
    console.log('Blog:', blog)
    dispatch(deleteBlog(blog.id))
  }

  const handleLike = (blog) => {
    console.log('Like clicked')
    console.log('Blog:', blog)
    dispatch(likeBlog(blog.id))
  }

  return (
    <div className="blog">
      <div className="blog-header">
        <div data-testid="blog-title">
          <MuiLink
            component={Link}
            color="inherit"
            underline="hover"
            to={`/blogs/${blog.id}`}
          >
            {blog.title}
          </MuiLink>
        </div>
        <div>
          {isAuthor && (
            <button
              className="delete-button"
              onClick={() => handleDelete(blog)}
            >
              Delete
            </button>
          )}
          <button onClick={toggleDetails}>
            {detailsVisible ? 'Hide' : 'View'}
          </button>
        </div>
      </div>
      {detailsVisible && (
        <div className="blog-details">
          <p>Author: {blog.author}</p>
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
          <div className="blog-likes-container">
            <p data-testid="blog-likes">Likes: {blog.likes}</p>
            <button className="like-button" onClick={() => handleLike(blog)}>
              Like
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

BlogItem.displayName = 'BlogItem'
export default BlogItem
