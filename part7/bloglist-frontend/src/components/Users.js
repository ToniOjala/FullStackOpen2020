import React, { useEffect } from 'react'
import { getUsers } from '../reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    width: 350
  }
})

const Users = () => {
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const classes = useStyles()
  const dispatch = useDispatch()

  const blogsWrittenBy = user => {
    let count = 0
    blogs.forEach(b => {
      if (b.user && b.user.id === user.id) count++
    })

    return count
  }

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <TableContainer className={classes.table} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user =>
              <TableRow key={user.name}>
                <TableCell>
                  <Link to={'/users/' + user.id}>{user.name}</Link>
                </TableCell>
                <TableCell>{blogsWrittenBy(user)}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users