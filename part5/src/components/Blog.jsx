import { useState } from 'react'
import '../styles/Blog.css'

const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  // Whether logged user is the author of the blog.
  // Used to show/hide the delete button.
  const isAuthor = user && user.username === blog.user.username
  console.log(user.username, blog.user.username, isAuthor)

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  return (
    <div className="blog">
      <div className="blog-header">
        <div>{blog.title}</div>
        <div>
          {isAuthor && (
            <button className="delete-button" onClick={() => deleteBlog(blog)}>
              Delete
            </button>
          )}
          <button onClick={toggleDetails}>{detailsVisible ? 'Hide' : 'View'}</button>
        </div>
      </div>
      {detailsVisible && (
        <div className="blog-details">
          <p>Author: {blog.author}</p>
          <p>URL: {blog.url}</p>
          <div className="blog-likes-container">
            <p>Likes: {blog.likes}</p>
            <button onClick={() => likeBlog(blog)}>Like</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog