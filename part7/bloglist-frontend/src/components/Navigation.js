import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  button: {
    marginRight: 10
  }
})

const Navigation = ({ user, handleLogout }) => {
  const classes = useStyles()

  return (
    <div>
      <Button className={classes.button}><Link className={classes.link} to="/">Blogs</Link></Button>
      <Button className={classes.button}><Link className={classes.link} to="/users">Users</Link></Button>
      <span>
        Logged in as {user.name}
        <Button onClick={handleLogout}>Log Out</Button>
      </span>
    </div>
  )
}

export default Navigation