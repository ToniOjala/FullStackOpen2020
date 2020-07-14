import React, {useState} from 'react'

const Blog = ({ blog, updateBlog }) => {
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

    updateBlog(blog.id, blogObject)
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
        </div> : 
        <div></div>
      }
    </div>
  )
}

export default Blog