import PropTypes from 'prop-types'
import Notification from './Notification'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
