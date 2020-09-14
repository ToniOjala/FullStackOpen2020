import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, user, deleteBlog }) => {
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          loggedInUser={user}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )
}

export default BlogList