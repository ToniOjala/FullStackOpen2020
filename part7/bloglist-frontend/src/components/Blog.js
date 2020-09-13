import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addLike } from '../reducers/blogReducer'

const Blog = ({ blog, loggedInUser, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [buttonText, setButtonText] = useState('Show')
  const dispatch = useDispatch()

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
    if (buttonText === 'Show') setButtonText('Hide')
    else setButtonText('Show')
  }

  const addALike = () => {
    dispatch(addLike(blog))
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog '${blog.name}' by ${blog.author}`)) {
      await deleteBlog(blog.id)
    }
  }

  return (
    <div className="blog">
      {blog.title} - by {blog.author}
      <button onClick={toggleShowDetails}>{buttonText}</button>
      {showDetails ?
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}
            <button onClick={addALike}>Like</button>
          </p>
          <p>{blog.user.name}</p>
          {loggedInUser.username === blog.user.username ?
            <p><button onClick={removeBlog}>Remove</button></p> :
            <div></div>
          }
        </div> :
        <div></div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog