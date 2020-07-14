import React, {useState} from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [buttonText, setButtonText] = useState('Show')

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
    if (buttonText === 'Show') setButtonText('Hide')
    else setButtonText('Show')
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
            <button>Like</button>
          </p>
          <p>{blog.user.name}</p>
        </div> : 
        <div></div>
      }
    </div>
  )
}

export default Blog
