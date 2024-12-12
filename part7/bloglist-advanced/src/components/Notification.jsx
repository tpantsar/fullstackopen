import '../styles/Notification.css'

const Notification = ({ message, type }) => {
  if (message === null) {
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

export default Notification
