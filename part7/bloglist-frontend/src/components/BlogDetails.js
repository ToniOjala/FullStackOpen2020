import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addLike, addComment } from '../reducers/blogsReducer'

const BlogDetails = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
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
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={addALike}>Like</button></div>
      <div>Added by {blog.user.name}</div>
      <h3>Comments</h3>
      <input
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button onClick={addAComment}>Add Comment</button>
      <ul>
        {blog.comments.map(c =>
          <li key={c}>
            {c}
          </li>
        )}
      </ul>
    </div>
  )
}

export default BlogDetails