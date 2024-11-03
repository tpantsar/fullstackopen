import { useState } from 'react'
import blogService from '../services/blogs'
import '../styles/Blog.css'

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [title, setTitle] = useState(blog.title)
  const [author, setAuthor] = useState(blog.author)
  const [url, setUrl] = useState(blog.url)
  const [likes, setLikes] = useState(blog.likes)

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const handleBlogLike = () => {
    console.log('Like clicked')
    console.log('Blog:', blog)
    blogService
      .update(blog.id, {
        ...blog,
        likes: likes + 1,
      })
      .then((updatedBlog) => {
        console.log('Blog updated:', updatedBlog)
        setTitle(updatedBlog.title)
        setAuthor(updatedBlog.author)
        setUrl(updatedBlog.url)
        setLikes(updatedBlog.likes)
      })
      .catch((error) => {
        console.error('Error updating blog:', error)
      })
  }

  return (
    <div className="blog">
      <div className="blog-header">
        <span>{title}</span>
        <button onClick={toggleDetails}>{detailsVisible ? 'Hide' : 'View'}</button>
      </div>
      {detailsVisible && (
        <div className="blog-details">
          <p>Author: {author}</p>
          <p>URL: {url}</p>
          <div className="blog-likes-container">
            <p>Likes: {likes}</p>
            <button onClick={handleBlogLike}>Like</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
