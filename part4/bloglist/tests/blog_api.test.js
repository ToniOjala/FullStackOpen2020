const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

let token = 'bearer '

beforeAll(async () => {
  await User.deleteMany()

  const user = {
    name: 'Toni Ojala',
    username: 'ojaton',
    password: 'asd123'
  }

  await api
    .post('/api/users')
    .send(user)
   
  delete user.name  

  await api
    .post('/api/login')
    .send(user)
    .then(response => {
      token = token.concat(response.body.token)
    })
})

beforeEach(async () => {
  await Blog.deleteMany()

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promises = blogObjects.map(blog => 
    api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization', token)
  )

  await Promise.all(promises)
})

describe('when there are initally some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct amount of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs have property named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: "Some random blog",
      author: "Some random author",
      url: "https:/www.randomblogbyrandomauthor.com",
      likes: 8429
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const addedBlog = blogsAtEnd.find(blog => blog.title === newBlog.title)
    expect(addedBlog).toBeTruthy()
    expect(addedBlog.author).toEqual(newBlog.author)
    expect(addedBlog.url).toEqual(newBlog.url)
    expect(addedBlog.likes).toEqual(newBlog.likes)
  })

  test('gives a default value of 0 for likes if not defined', async () => {
    const newBlog = {
      title: "Some random blog",
      author: "Some random author",
      url: "https:/www.randomblogbyrandomauthor.com",
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
  
      const blogsAtEnd = await helper.blogsInDb()
  
      const addedBlog = blogsAtEnd.find(blog => blog.title === newBlog.title)
      expect(addedBlog).toBeTruthy()
      expect(addedBlog.likes).toEqual(0)
  })
  
  test('fails with statuscode 400 if title and url are not defined', async () => {
    const newBlog = {
      author: "Some random author",
      likes: 1812
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(400)
  })

  test('fails with statuscode 401 if token is not provided', async () => {
    const newBlog = {
      title: "Some random blog",
      author: "Some random author",
      url: "https:/www.randomblogbyrandomauthor.com",
      likes: 8429
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

describe('deleting a blog', () => {
  test('succeeds with a valid id', async () => {
    let response = await api.get('/api/blogs')
    const blogToDelete = response.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', token)
      .expect(204)

      const blogs = await helper.blogsInDb()

    expect(blogs).toHaveLength(helper.initialBlogs.length - 1)
  })
})

describe('updating a blog', () => {
  test('succeeds with valid data', async () => {
    let response = await api.get('/api/blogs')
    const blogToUpdate = response.body[0]

    blogToUpdate.title = "Updated Title"
    blogToUpdate.author = "Updated Author"
    blogToUpdate.url = "Updated Url"
    blogToUpdate.likes = 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogs = await helper.blogsInDb()
    const updatedBlog = blogs[0]

    expect(updatedBlog.title).toEqual(blogToUpdate.title)
    expect(updatedBlog.author).toEqual(blogToUpdate.author)
    expect(updatedBlog.url).toEqual(blogToUpdate.url)
    expect(updatedBlog.likes).toEqual(blogToUpdate.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})