import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Please log in</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  )

  const blogsView = () => (
    <div>
      <h2>Blogs</h2>

      <p>
        Logged in as {user.name}
        <button onClick={handleLogout}>Log Out</button>
      </p>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
    } catch (exception) {
      console.log(exception)
      console.log('Wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    window.location.reload(false)
  }

  return (
    <div>
      { user ?
        blogsView() :
        loginForm()
      }
    </div>
  )
}

export default App