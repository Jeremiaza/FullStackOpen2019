const express = require('express')
const app = express()

let persons = 
    {
        "persons": [
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
      }


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.send(persons)
})

app.get('/info', (req, res) => {

  const info = {
    content: 'Phonebook has info for '+persons.persons.length+ ' people',
    date: new Date(),
  }

  
  res.send(info.content +'<br>'+ info.date)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})