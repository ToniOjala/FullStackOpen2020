import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = value => {
  token = `bearer ${value}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async blog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (blog) => {
  console.log(blog)
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token }
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}

// const addComment = async (id, comment) => {
//   const response = await axios.post(`${baseUrl}/api/blogs/{id}/comments`, comment)
//   return response.data
// }

export default { setToken, getAll, create, update, deleteBlog }