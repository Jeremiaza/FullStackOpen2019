const express = require('express')
const config = require('./utils/config')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const usersRouter = require('./controllers/users')
const blogRouter = require('./controllers/blogs')
//const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogRouter)
//app.use('/api/login', loginRouter)


module.exports = app