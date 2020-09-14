import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE_BLOG':
    return state.concat(action.data)
  case 'DELETE_BLOG':
    return state.filter(b => b.id !== action.data)
  case 'ADD_LIKE':
    return state.map(b => b.id !== action.data.id ? b : action.data)
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export const addLike = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.update({ ...blog, user: blog.user.id, likes: blog.likes + 1 })
    dispatch({
      type: 'ADD_LIKE',
      data: updatedBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogsReducer