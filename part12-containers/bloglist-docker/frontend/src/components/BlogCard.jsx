import { Link as MuiLink, Stack } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import '../styles/Blog.css'

export default function BlogCard({ blog, user }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLike = (blog) => {
    console.log('Like clicked')
    console.log('Blog:', blog)
    dispatch(likeBlog(blog.id))
  }

  const handleDelete = (blog) => {
    console.log('Delete clicked')
    console.log('Blog:', blog)
    dispatch(deleteBlog(blog.id))
    navigate('/')
  }

  // Whether logged user is the author of the blog.
  // Used to show/hide the delete icon button.
  let isAuthor = false
  if (blog.user) {
    isAuthor = user && user.username === blog.user.username
    console.log(user.username, blog.user.username, isAuthor)
  }

  console.log('blog', blog)
  console.log('user', user)

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography style={{ marginBottom: 5 }} variant="h5" component="div">
          {blog.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
          Author:
          <MuiLink
            style={{ marginLeft: 5 }}
            component={Link}
            color="primary"
            underline="hover"
            to={`/users/${blog.user.id}`}
          >
            {blog.author}
          </MuiLink>
        </Typography>
        <Stack direction="row" spacing={2}>
          <div className="blog-likes-container">
            <p data-testid="blog-likes">Likes: {blog.likes}</p>
            <button onClick={() => handleLike(blog)}>Like</button>
            {isAuthor && (
              <button
                onClick={() => handleDelete(blog)}
                style={{ backgroundColor: 'red' }}
              >
                Delete
              </button>
            )}
          </div>
        </Stack>
      </CardContent>
      <CardActions>
        <MuiLink
          style={{ marginLeft: 10, marginBottom: 5 }}
          href={blog.url}
          target="_blank"
          color="primary"
          underline="hover"
        >
          {blog.url}
        </MuiLink>
      </CardActions>
    </Card>
  )
}
