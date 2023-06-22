require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')

app.use(express.json())

// Cors:
const cors = require('cors')
app.use(cors({ origin: true, credentials: true }))

// Morgan:
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :body'
    )
)

app.use(express.static('build'))

// Endpoints:
app.get('/', (req, res) => {
    res.send('<h1>Puhelinluettelo backend</h1>')
})

app.get('/info', (req, res) => {
    Person.find({}).then((persons) => {
        res.send(
            `Phonebook has info for ${
                persons.length
            } people<br /><br />${new Date()}`
        )
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then((persons) => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then((person) => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then((result) => {
            result.status(204).end()
        })
        .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId(),
    })

    person
        .save()
        .then((savedPerson) => {
            response.json(savedPerson)
        })
        .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number,
        //id: body.id,
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then((updatedPerson) => {
            res.json(updatedPerson)
        })
        .catch((error) => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// Error handler:
const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const generateId = () =>
    //(persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0) + 1
    Math.floor(Math.random() * 1000000)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app
