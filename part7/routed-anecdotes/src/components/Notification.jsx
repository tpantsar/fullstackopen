import PropTypes from 'prop-types'
import '../styles/Notification.css'

const Notification = ({ message, type }) => {
  console.log('Notification:', message, type)
  if (message === null || message === '') {
    return null
  }

  if (type === 'error') {
    return <div className="notification error">{message}</div>
  } else if (type === 'success') {
    return <div className="notification success">{message}</div>
  } else {
    return <div className="notification">{message}</div>
  }
}
Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
}

export default Notification
