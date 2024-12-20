import DeleteIcon from '@mui/icons-material/Delete'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { IconButton, Link as MuiLink, TableCell, TableRow } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const BlogItem = ({ blog, user }) => {
  const dispatch = useDispatch()

  // Whether logged user is the author of the blog.
  // Used to show/hide the delete icon button.
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
    <TableRow key={blog.id}>
      <TableCell align="left">
        <IconButton
          onClick={() => handleLike(blog)}
          size="small"
          aria-label="like blog"
          color="success"
        >
          <ThumbUpIcon />
        </IconButton>
        {isAuthor && (
          <IconButton
            onClick={() => handleDelete(blog)}
            size="small"
            aria-label="delete"
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        )}
      </TableCell>
      <TableCell align="left">
        <MuiLink
          component={Link}
          color="primary"
          underline="hover"
          to={`/blogs/${blog.id}`}
        >
          {blog.title}
        </MuiLink>
      </TableCell>
      <TableCell align="left">{blog.author}</TableCell>
      <TableCell align="left">{blog.url}</TableCell>
      <TableCell align="left">{blog.likes}</TableCell>
    </TableRow>
  )
}

BlogItem.displayName = 'BlogItem'
export default BlogItem
