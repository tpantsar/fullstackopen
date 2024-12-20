import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logUserOut } from '../reducers/userReducer'

export default function Menu({ user }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logUserOut())
    navigate('/')
  }

  return (
    <AppBar position="static" sx={{ mb: 3, borderRadius: 1 }}>
      <Toolbar>
        <Button color="inherit" LinkComponent={Link} to="/">
          Blogs
        </Button>
        <Button color="inherit" LinkComponent={Link} to="/users">
          Users
        </Button>
        {user ? (
          <Box sx={{ ml: 'auto' }}>
            <Typography variant="body1" color="inherit" component="div">
              {user.name} logged in{' '}
              <Button color="error" variant="contained" onClick={handleLogout}>
                Log out
              </Button>
            </Typography>
          </Box>
        ) : (
          <Button
            color="success"
            sx={{ ml: 'auto' }}
            variant="contained"
            LinkComponent={Link}
            to={'/login'}
          >
            login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
