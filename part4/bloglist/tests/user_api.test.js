const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

const initialUsers = [
  {
    name: "Toni Ojala",
    username: "ojaton",
    password: "asd123"
  },
  {
    name: "Matti Meikäläinen",
    username: "matmei",
    password: "sala123"
  }
]

beforeEach(async () => {
  await User.deleteMany()
})

describe('when there are initially some users saved', () => {
  beforeEach(async () => {
    const userObjects = initialUsers
      .map(user => new User(user))
    const promises = userObjects.map(user => user.save())
    await Promise.all(promises)
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct amount of users is returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
  })

  test('users have property named id', async () => {
    const response = await api.get('/api/users')
    response.body.forEach(user => {
      expect(user.id).toBeDefined()
    })
  })

  test('trying to add new user with existing username fails with statuscode 400', async () => {
    const newUser = {
      name: 'Matti Meikäläinen',
      username: 'matmei',
      password: 'jotainmuuta'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

describe('addition of users', () => {
  test('succeeds with valid data', async () => {
    const newUser = {
      name: 'Toni Ojala',
      username: 'ojaton',
      password: 'asd123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(1)
  
    const addedUser = usersAtEnd[0]
    expect(addedUser.id).toBeDefined()
    expect(addedUser.name).toEqual(newUser.name)
    expect(addedUser.username).toEqual(newUser.username)
  })

  test('fails with statuscode 400 if username is not defined', async () => {
    const newUser = {
      name: 'Toni Ojala',
      password: 'asd123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('fails with statuscode 400 if username less than 3 characters long', async () => {
    const newUser = {
      name: 'Toni Ojala',
      username: 'to',
      password: 'asd123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('fails with statuscode 400 if password is not defined', async () => {
    const newUser = {
      name: 'Toni Ojala',
      username: 'ojaton',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('fails with statuscode 400 if password is less than 3 characters long', async () => {
    const newUser = {
      name: 'Toni Ojala',
      username: 'ojaton',
      password: 'pw'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})