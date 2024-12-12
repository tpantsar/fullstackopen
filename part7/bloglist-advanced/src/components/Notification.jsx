import { useSelector } from 'react-redux'
import '../styles/Notification.css'

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)

  if (message === null || message === '' || message === undefined) {
    return null
  }

  if (type === 'error') {
    return <div className="notification notification-error">{message}</div>
  } else if (type === 'success') {
    return <div className="notification notification-success">{message}</div>
  } else {
    return <div className="notification">{message}</div>
  }
}

export default Notification
