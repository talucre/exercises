require("dotenv").config()
const express = require("express")
const Person = require("./models/person")
const morgan = require("morgan")

const app = express()

morgan.token("req-body", (request, response) => JSON.stringify(request.body))

app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :req-body"
    )
)
app.use(express.static("dist"))
app.use(express.json())

app.get("/api/info", (request, response) => {
    Person.countDocuments({}).then(count => {
        response.send(count)
    })
})

app.get("/api/people", (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get("/api/people/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post("/api/people", (request, response) => {
    const body = request.body

    if (!body.name && !body.number) {
        return response.status(400).json({ error: "content missing" })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.put("/api/people/:id", (request, response, next) => {
    const { number } = request.body

    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end()
            }

            person.number = number

            return person.save().then(updatedPerson => {
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})

app.delete("/api/people/:id", (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if ((error.name = "CastError")) {
        response.status(400).send({ error: "malformatted id" })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server listenning on port ${PORT}`)
})
