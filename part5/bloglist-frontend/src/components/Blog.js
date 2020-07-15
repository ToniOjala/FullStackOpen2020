import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, loggedInUser, updateBlog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [buttonText, setButtonText] = useState('Show')

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
    if (buttonText === 'Show') setButtonText('Hide')
    else setButtonText('Show')
  }

  const addLike = async () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user.id
    }

    await updateBlog(blog.id, blogObject)
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
            <button onClick={addLike}>Like</button>
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
  loggedInUser: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog