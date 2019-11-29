require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')



app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

/*
  Create token for logging POST requests. Only use the token when
  the request is a POST request.
*/
morgan.token('post', (req, res) => JSON.stringify(req.body))
app.use(morgan(function (tokens, req, res) {
  console.log(tokens.method)
  if (tokens.method(req, res) === "POST"){
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.post(req, res)
    ].join(' ')
  } else {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  }
}))

/*
Persons are now being stored in the database, so this array will not
be used any more.
let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 2337986436
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 8309359343
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 9306800825
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 3264606582
  }
]
*/

/*
The database generates the id, so this function will not be used anymore
// Id is generated in a range between 1 and 10 billion
const generateId = () => {
  const max = 10000000000
  const min = 1000000000
  return(Math.floor((Math.random() * (max - min) + min)))
}
*/

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
              <p>${new Date()}</p>`)
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => person ? res.json(person) : res.status(404).end())
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
