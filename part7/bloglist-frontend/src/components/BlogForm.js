import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles({
  root: {
    marginTop: 50
  },
  text: {
    width: 270,
    marginBottom: 10
  },
  button: {
    width: 270,
    marginTop: 10,
  }
})

const BlogForm = ({ createBlog }) => {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2 className={classes.root}>Create New</h2>
      <div>
        <TextField
          className={classes.text}
          id="title"
          label="Title"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <TextField
          className={classes.text}
          id="author"
          label="Author"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <TextField
          className={classes.text}
          id="url"
          label="URL"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <Button
        className={classes.button}
        variant="contained" color="primary"
        id="create-button"
        type="submit"
      >
        Create
      </Button>
    </form>
  )
}

export default BlogForm