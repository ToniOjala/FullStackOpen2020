import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setSuccessMessage, setErrorMessage } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, deleteBlog } from './reducers/blogReducer'
import { setUser, loginUser, removeUser } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const addNewBlog = async blogObject => {
    dispatch(createBlog(blogObject))
    blogFormRef.current.toggleVisibility()
    dispatch(setSuccessMessage(`Blog added: '${blogObject.title}`))
  }

  const deleteABlog = async id => {
    dispatch(deleteBlog(id))
    dispatch(setSuccessMessage('Blog deleted'))
  }

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

  const handleLogout = () => {
    dispatch(removeUser())
    blogService.setToken('')
    window.location.reload(false)
  }

  const blogsView = () => (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          loggedInUser={user}
          deleteBlog={deleteABlog}
        />
      )}
    </div>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm createBlog={addNewBlog} />
    </Togglable>
  )

  const loginForm = () => (
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

  return (
    <div>
      {Object.keys(user).length > 0 ?
        <p>
          Logged in as {user.name}
          <button onClick={handleLogout}>Log Out</button>
        </p> :
        <div></div>
      }
      <Notification />
      { Object.keys(user).length > 0 ?
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