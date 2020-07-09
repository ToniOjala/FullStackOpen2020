const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [ 
  { 
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0, 
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }
]

beforeEach(async () => {
  await Blog.deleteMany()

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promises = blogObjects.map(blog => blog.save())
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
    expect(response.body).toHaveLength(initialBlogs.length)
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
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogsAtEnd = response.body
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

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
  
      const response = await api.get('/api/blogs')
      const blogsAtEnd = response.body
  
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
      .expect(400)
  })
})

describe('deleting a blog', () => {
  test('succeeds with a valid id', async () => {
    let response = await api.get('/api/blogs')
    const blogToDelete = response.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    response = await api.get('/api/blogs')
    const blogs = response.body

    expect(blogs).toHaveLength(initialBlogs.length - 1)
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

    response = await api.get('/api/blogs')
    const updatedBlog = response.body[0]

    expect(updatedBlog.title).toEqual(blogToUpdate.title)
    expect(updatedBlog.author).toEqual(blogToUpdate.author)
    expect(updatedBlog.url).toEqual(blogToUpdate.url)
    expect(updatedBlog.likes).toEqual(blogToUpdate.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})