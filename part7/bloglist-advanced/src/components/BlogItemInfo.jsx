import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import '../styles/Blog.css'

const BlogItemInfo = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleLike = (blog) => {
    console.log('Like clicked')
    console.log('Blog:', blog)
    dispatch(likeBlog(blog.id))
  }

  // Add comment to the blog
  const handleComment = (event) => {
    event.preventDefault()
    if (comment.length <= 0) {
      dispatch(setNotification('Comment cannot be empty', 'error', 5))
      return
    }
    console.log('Comment clicked')
    dispatch(commentBlog(blog.id, comment))
    setComment('')
  }

  if (!blog || !user) {
    return <div>Loading ...</div>
  }

  // Whether logged user is the author of the blog.
  // Used to show/hide the delete button.
  let isAuthor = false
  if (blog.user) {
    isAuthor = user && user.username === blog.user.username
    console.log(user.username, blog.user.username, isAuthor)
  }

  return (
    <div>
      <div>
        <h1 data-testid="blog-title">{blog.title}</h1>
        <p>Added by {blog.author}</p>
        <a
          href={blog.url}
          target="_blank"
          rel="noreferrer"
          data-testid="blog-url"
        >
          {blog.url}
        </a>
        <div className="blog-likes-container">
          <p data-testid="blog-likes">Likes: {blog.likes}</p>
          <button onClick={() => handleLike(blog)}>Like</button>
        </div>
        <div>
          <h2>Comments</h2>
          <form onSubmit={handleComment}>
            <input
              type="text"
              id="comment"
              name="Comment"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              placeholder=""
            />
            <button type="submit">Add comment</button>
          </form>
          <ul>
            {blog.comments.length === 0 && <li>No comments</li>}
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

BlogItemInfo.displayName = 'BlogItemInfo'
export default BlogItemInfo
