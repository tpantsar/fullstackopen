import { useState } from 'react'
import '../styles/Blog.css'

const Blog = ({ blog, likeBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  return (
    <div className="blog">
      <div className="blog-header">
        <span>{blog.title}</span>
        <button onClick={toggleDetails}>{detailsVisible ? 'Hide' : 'View'}</button>
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
