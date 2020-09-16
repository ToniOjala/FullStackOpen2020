import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addLike, addComment } from '../reducers/blogsReducer'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    marginTop: 50
  },
  line: {
    marginBottom: 10
  }
})

const BlogDetails = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const classes = useStyles()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const addALike = () => {
    dispatch(addLike(blog))
  }

  const addAComment = () => {
    dispatch(addComment(blog, comment))
    setComment('')
  }

  if (!blog) return null

  return (
    <Card className={classes.root}>
      <CardContent>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes</div>
        <div>Added by {blog.user.name}</div>
        <h3>Comments</h3>
        <ul>
          {blog.comments.map(c =>
            <li key={c}>
              {c}
            </li>
          )}
        </ul>
      </CardContent>
      <CardActions>
        <button onClick={addALike}>Like</button>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button onClick={addAComment}>Add Comment</button>
      </CardActions>
    </Card>
  )
}

export default BlogDetails