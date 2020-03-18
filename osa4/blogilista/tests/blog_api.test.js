const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('../utils/for_testing')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are three blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(3)
})

test('blog identifier is id not _id', async () => {
  const response = await api.get('/api/blogs')
  let isCorrect = true;
  response.body.forEach(element => {
    if (element._id) {
      isCorrect = false
    }
  });
  expect(isCorrect).toBe(true)
})

test('add blog', async () => {
  let testBlog = {
    "title": "Test Blog",
    "author": "Tester",
    "url": "www.blogtest.com",
    "likes": 199
  }
  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(200)
})

test('update blog likes', async () => {
  const response = await api.get('/api/blogs')
  let lastBlogId;
  response.body.forEach(element => {
    lastBlogId = element.id;
  });
  let testBlog = {
    "title": "Test Blog",
    "author": "Tester",
    "url": "www.blogtest.com",
    "likes": 200
  }
  await api
    .put(`/api/blogs/${lastBlogId}`, testBlog)
    .expect(204)
})

test('delete blog', async () => {
  const response = await api.get('/api/blogs')
  let lastBlogId;
  response.body.forEach(element => {
    lastBlogId = element.id;
  });
  await api
    .delete(`/api/blogs/${lastBlogId}`)
    .expect(204)
})

test('the first blog author is Ollie', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].author).toBe('Ollie')
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "Jeremiaza",
      name: "Jeremias",
      password: "salasana",
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})