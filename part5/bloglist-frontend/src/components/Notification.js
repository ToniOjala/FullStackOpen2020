import React from 'react'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div>
      {type === 'success' ?
        <div className="success">
          {message}
        </div> :
        <div className="error">
          {message}
        </div>
      }
    </div>
  )
}

export default Notification