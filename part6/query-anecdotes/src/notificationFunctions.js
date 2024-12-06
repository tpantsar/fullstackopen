import { useContext } from 'react'
import NotificationContext from './NotificationContext'

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

let timeoutId

export const setNotification = (message, dispatch) => {
  // Prevent overlapping notifications
  clearTimeout(timeoutId)

  dispatch({ type: 'SET', payload: message })
  timeoutId = setTimeout(() => {
    dispatch({ type: 'CLEAR' })
  }, 5000)
}
