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

  blog.comments = []

  const response = await axios.post(baseUrl, blog, config)
  console.log(response.data)
  return response.data
}

const update = async (blog) => {
  console.log(blog)
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  console.log(response.data)
  return response.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token }
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { setToken, getAll, create, update, deleteBlog }