import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logUserIn } from '../reducers/userReducer'
import Notification from './Notification'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(logUserIn(username, password))
    setUsername('')
    setPassword('')
  }

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Log in to application</h2>
      </div>
      <Notification />
      <div>
        username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
