import { useRef } from 'react'
import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import BlogItem from './BlogItem'
import Togglable from './Togglable'

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs)
  console.log('blogs', blogs)

  const blogFormRef = useRef()

  if (!blogs) {
    return <div>No blogs available</div>
  }

  // Sort blogs by likes in descending order (highest likes first)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  if (sortedBlogs.length === 0) {
    return <div>No blogs available</div>
  }

  return (
    <>
      <Box textAlign="left" sx={{ mt: 1, mb: 1 }}>
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm ref={blogFormRef} />
        </Togglable>
      </Box>
      <Box textAlign="left" sx={{ mt: 3, mb: 3 }}>
        <h2>Blogs: {sortedBlogs.length}</h2>
        <TableContainer className="table-container" component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Like / Delete</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Author</TableCell>
                <TableCell align="left">Url</TableCell>
                <TableCell align="left">Likes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedBlogs.map((blog) => (
                <BlogItem key={blog.id} blog={blog} user={user} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default BlogList
