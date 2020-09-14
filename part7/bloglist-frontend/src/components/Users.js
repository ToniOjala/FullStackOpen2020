import React, { useEffect } from 'react'
import { getUsers } from '../reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const blogsWrittenBy = user => {
    let count = 0
    blogs.forEach(b => {
      if (b.user.id === user.id) count++
    })

    return count
  }

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
          <tr key={user.name}>
            <td>
              <Link to={'/users/' + user.id}>{user.name}</Link>
            </td>
            <td>{blogsWrittenBy(user)}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Users