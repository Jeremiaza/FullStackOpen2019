const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (!request.body.title) {
    return response.status(400).json({
      error: 'Title is missing'
    })
  }
  if (!request.body.url) {
    return response.status(400).json({
      error: 'url is missing'
    })
  }

  const blog = new Blog(
    {
      "title": request.body.title,
      "author": request.body.author,
      "url": request.body.url,
      "user": {
        "username": user.username,
        "name": user.name,
        "id": user._id
      },
      "likes": request.body.likes | 0
    })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogRouter.put('/:id', (request, response, next) => {
  const id = request.params.id
  const blog =
  {
    "title": request.body.title,
    "author": request.body.author,
    "url": request.body.url,
    "likes": request.body.likes
  }

  Blog.findByIdAndUpdate(id, blog)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogRouter.delete('/:id',async (request, response, next) => {
  const id = request.params.id
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(id)
  if (user.username===blog.user.username) {
    const deletedBlog = await Blog.findById(id)
    user.blogs = user.blogs.splice(deletedBlog._id)
    await user.save()
    await Blog.findByIdAndRemove(id)
  }
})

module.exports = blogRouter