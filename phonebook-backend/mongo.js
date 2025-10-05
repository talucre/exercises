const mongoose = require("mongoose")
const url = "mongodb://127.0.0.1:27017/PhonebookApp"

// Mongo connection
mongoose.set("strictQuery", false)
mongoose.connect(url)

// Phone schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model("Person", personSchema)

// Main code
if (process.argv.length == 4) {
    const name = process.argv[2]
    const number = process.argv[3]

    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}

if (process.argv.length == 3) {
    const name = process.argv[2]

    Person.findOne({ name: name }).then(person => console.log(person))
}

if (process.argv.length == 2) {
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}
