import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const userId = useParams().id
  const user = users.find(u => u.id === userId)

  const blogsWrittenBy = user => {
    const usersBlogs = []
    blogs.forEach(b => {
      if (b.user.id === user.id) usersBlogs.push(b)
    })

    return usersBlogs
  }

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {blogsWrittenBy(user).map(b =>
          <li key={b.title}>
            {b.title}
          </li>
        )}
      </ul>
    </div>
  )
}

export default User