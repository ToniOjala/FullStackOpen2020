import React, { useEffect, useRef } from 'react'
import Container from '@material-ui/core/Container'
import Navigation from './components/Navigation'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import BlogDetails from './components/BlogDetails'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSuccessMessage } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, deleteBlog } from './reducers/blogsReducer'
import { setUser, removeUser } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
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

  const handleLogout = () => {
    dispatch(removeUser())
    blogService.setToken('')
    window.location.reload(false)
  }

  const blogFormRef = useRef()

  if (Object.keys(user).length > 0) {
    return (
      <Container>
        <Router>
          <Navigation user={user} handleLogout={handleLogout} />
          <Notification />
          <Switch>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="/">
              <BlogList
                blogs={blogs}
                user={user}
                deleteBlog={deleteABlog}
              />
              <Togglable buttonLabel="New Blog" ref={blogFormRef}>
                <BlogForm createBlog={addNewBlog} />
              </Togglable>
            </Route>
          </Switch>
        </Router>
      </Container>
    )
  } else {
    return (
      <LoginForm user={user} />
    )
  }
}

export default App