import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { setErrorMessage } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const LoginForm = ({ user }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      dispatch(loginUser({ username, password }))
      blogService.setToken(user.token)
    } catch (exception) {
      console.log(exception)
      dispatch(setErrorMessage('Wrong credentials'))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Please log in</h2>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">Log In</button>
    </form>
  )
}

export default LoginForm