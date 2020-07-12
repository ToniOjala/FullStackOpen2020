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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      setUser(user)
    } catch (exception) {
      console.log(exception)
      console.log('Wrong credentials')
    }
  }

  return (
    <div>
      { user ?
        <div>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div> :
        loginForm()
      }
    </div>
  )
}

export default App