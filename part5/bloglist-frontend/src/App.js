import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogsView = () => (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog 
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          loggedInUser={user}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
    }
  }, [])

  const addNewBlog = async blogObject => {
    const returnedBlog = await blogService.create(blogObject)
    blogFormRef.current.toggleVisibility()
    setBlogs(blogs.concat(returnedBlog))
    showSuccessMessage(`Blog added: '${returnedBlog.title}'`)

  }

  const updateBlog = async (id, blogObject) => {
    const returnedBlog = await blogService.update(id, blogObject)
    const copy = blogs.map(blog => {
      if (blog.id === returnedBlog.id) return returnedBlog
      return blog
    })
    setBlogs(copy)
  }

  const deleteBlog = async id => {
    await blogService.deleteBlog(id)
    const updatedBlogs = blogs.filter(blog => blog.id !== id)
    setBlogs(updatedBlogs)
    showSuccessMessage('Blog deleted')
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
    } catch (exception) {
      console.log(exception)
      showErrorMessage('Wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken('')
    window.location.reload(false)
  }

  const showSuccessMessage = message => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }

  const showErrorMessage = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="New Note" ref={blogFormRef}>
      <BlogForm createBlog={addNewBlog} />
    </Togglable>
  )

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

  return (
    <div>
      {user ?
        <p>
          Logged in as {user.name}
          <button onClick={handleLogout}>Log Out</button>
        </p> :
        <div></div>
      }
      <Notification message={successMessage} type='success' />
      <Notification message={errorMessage} type='error' />
      { user ?
        <div>
          { blogsView() }
          { blogForm() }
        </div> :
        loginForm()
      }
    </div>
  )
}

export default App