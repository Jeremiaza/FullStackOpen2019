const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  if (!request.body.username) {
    return response.status(400).json({
      error: 'Username is missing'
    })
  }
  if (!request.body.password) {
    return response.status(400).json({
      error: 'password is missing'
    })
  }
  if (request.body.password.length <3) {
    return response.status(400).json({
      error: 'password must be 3 characters minimum'
    })
  }
  const body = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name || body.username,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter