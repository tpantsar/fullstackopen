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

const UsersTable = ({ users }) => {
  return (
    <Box textAlign="left" sx={{ mt: 3, mb: 3 }}>
      <h2>Users: {users.length}</h2>
      <TableContainer className="table-container" component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="left">
                  <MuiLink
                    component={Link}
                    color="primary"
                    underline="hover"
                    to={`/users/${user.id}`}
                  >
                    {user.name}
                  </MuiLink>
                </TableCell>
                <TableCell align="left">{user.username}</TableCell>
                <TableCell align="left">{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

UsersTable.displayName = 'UsersTable'
export default UsersTable
