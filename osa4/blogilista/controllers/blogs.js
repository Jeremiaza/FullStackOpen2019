const blogRouter = require('express').Router()
const Blog = require('../models/blog')

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

blogRouter.post('/', (request, response) => {
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
      "likes": request.body.likes | 0
    })

  blog
    .save()
    .then(savedBlog => savedBlog.toJSON())
    .then(savedAndFormattedBlog => {
      response.json(savedAndFormattedBlog)
    })
    .catch(error => next(error))
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

blogRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id
  Blog.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = blogRouter