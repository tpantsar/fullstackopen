import { useState } from 'react'
import '../styles/Blog.css'

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  return (
    <div className="blog">
      <div>
        <span>{blog.title}</span>
        <button onClick={toggleDetails}>{detailsVisible ? 'Hide' : 'View'}</button>
      </div>
      {detailsVisible && (
        <div className="blog-details">
          <p>Author: {blog.author}</p>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes}</p>
        </div>
      )}
    </div>
  )
}

export default Blog
