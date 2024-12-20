import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

export default function Comments({ blog }) {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

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

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        <b>Comments</b>
      </Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {
            m: 1,
            width: '25ch',
          },
          alignItems: 'center',
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleComment}
      >
        <TextField
          id="outlined-multiline-flexible"
          label="Your comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          multiline
          maxRows={4}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Add comment
        </Button>
      </Box>
      <List dense={true} sx={{ mt: 2 }}>
        {blog.comments.length === 0 && (
          <ListItem>
            <ListItemText primary="No comments" />
          </ListItem>
        )}
        {blog.comments.map((comment, index) => (
          <ListItem key={index}>
            <ListItemText primary={comment} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
