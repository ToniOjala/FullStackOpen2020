import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification.message !== '') {
    return (
      <div>
        {notification.type === 'success' ?
          <div className="success">
            {notification.message}
          </div> :
          <div className="error">
            {notification.message}
          </div>
        }
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default Notification