const mongoose = require('mongoose')
const supertest = require('supertest')
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
  
  test('the first blog author is Ollie', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].author).toBe('Ollie')
  })

afterAll(() => {
  mongoose.connection.close()
})