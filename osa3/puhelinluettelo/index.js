const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())
app.use(morgan(':method :status :nametoken :numbertoken :res[content-length] - :response-time ms'))
morgan.token('nametoken', function(req, res) {
	return req.body.name;
});
morgan.token('numbertoken', function(req, res) {
  return req.body.number;
});
let persons =

  [
    {
      "name": "Arto Hellas",
      "number": "040-123123",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "dawwad",
      "number": "121231",
      "id": 5
    }
  ]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.send(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => {
    console.log(person.id, typeof person.id, id, typeof id, person.id === id)
    return person.id === id
  })
  console.log(person)
  response.json(person)
})

app.get('/info', (req, res) => {

  const info = {
    content: 'Phonebook has info for ' + persons.length + ' people',
    date: new Date(),
  }

  res.send(info.content + '<br>' + info.date)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  if (!request.body.name) {
    return response.status(400).json({
      error: 'name is missing'
    })
  }
  if (!request.body.number) {
    return response.status(400).json({
      error: 'number is missing'
    })
  }
  const name = request.body.name
  persons.forEach(person => {
    if (person.name === name) {
      return response.status(400).json({
        error: 'name already exists'
      })
    }
  })

  const person =
  {
    "name": request.body.name,
    "number": request.body.number,
    "id": Math.floor(Math.random() * 5000) + 1
  }
  console.log(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})