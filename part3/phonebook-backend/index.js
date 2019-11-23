const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
//Create token for logging POST requests
morgan.token('post', (req, res) => req.route.methods.post ? JSON.stringify(req.body) : undefined)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

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

// Id is generated in a range between 1 and 10 billion
const generateId = () => {
  const max = 10000000000
  const min = 1000000000
  return(Math.floor((Math.random() * (max - min) + min)))
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  // Check for errors
  if (!body.name || !body.number)  {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }
  const duplicateName = persons.find(person => person.name === body.name)
  if (duplicateName) {
    return response.status(400).json({
      error: 'name must be unique' 
    })
  }

  // If no errors, add a new person
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)
  response.json(person)
})


app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
