import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import '../styles/Blog.css'

const BlogItemInfo = ({ blog, user }) => {
  const dispatch = useDispatch()

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
          {isAuthor && (
            <button
              className="delete-button"
              onClick={() => handleDelete(blog)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

BlogItemInfo.displayName = 'BlogItemInfo'
export default BlogItemInfo
