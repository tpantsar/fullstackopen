import { Link } from 'react-router-dom'

import {
  Box,
  Link as MuiLink,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

const User = ({ user }) => {
  if (!user) {
    return <div>Loading user information ...</div>
  }

  const blogs = user.blogs

  return (
    <Box textAlign="left" sx={{ mt: 3, mb: 3 }}>
      <h2>{user.name}</h2>
      <h3>Added blogs: {blogs.length}</h3>
      <TableContainer className="table-container" component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Author</TableCell>
              <TableCell align="left">Url</TableCell>
              <TableCell align="left">Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No blogs added
                </TableCell>
              </TableRow>
            )}
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell align="left">
                  <MuiLink
                    component={Link}
                    color="inherit"
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

User.displayName = 'LatestWeatherTable'
export default User
