import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addLike } from '../reducers/blogsReducer'

const BlogDetails = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const addALike = () => {
    dispatch(addLike(blog))
  }

  if (!blog) return null

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={addALike}>Like</button></div>
      <div>Added by {blog.user.name}</div>
    </div>
  )
}

export default BlogDetails