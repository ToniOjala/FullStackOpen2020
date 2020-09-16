import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'

const useStyles = makeStyles({
  root: {
    width: 250,
    padding: 10,
    marginBottom: 10
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  }
})

const Blog = ({ blog }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root} variant="outlined">
      <Link className={classes.link} to={'/blogs/' + blog.id}>{blog.title} - by {blog.author}</Link>
    </Card>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog