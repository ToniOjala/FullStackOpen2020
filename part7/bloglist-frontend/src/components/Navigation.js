import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = ({user, handleLogout}) => {
  const padding = {
    paddingRight: 10
  }

  return (
    <div>
      <Link style={padding} to="/">Blogs</Link>
      <Link style={padding} to="/users">Users</Link>
      <span>
        Logged in as {user.name}
        <button onClick={handleLogout}>Log Out</button>
      </span>
    </div>
  )
}

export default Navigation