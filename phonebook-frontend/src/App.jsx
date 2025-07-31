import { useEffect, useState } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [shownPersons, setShownPersons] = useState(persons)

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  useEffect(() => {
    filterPersons(filter, persons)
  }, [filter, persons])

  const updatePerson = (person) => {
    const replace = confirm(`${newName} already exists. Replace the old number with a new one?`)
    if (!replace) return
        const newPerson = {...person, number: newNumber}
        personService
          .updatePerson(person.id, newPerson)
          .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
              setSuccessMessage(`Updated ${returnedPerson.name}`)
              setTimeout(() => setSuccessMessage(null), 5000)
          })
          .catch(error => {
              setPersons(persons.filter(p => p.id !== person.id))
              setErrorMessage(`
                Information of ${person.name} has already been removed from server
                `)
              setTimeout(() => setErrorMessage(null), 5000)
          })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName)
    if (person) {
      updatePerson(person)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .createPerson(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => setSuccessMessage(null), 5000)
        setNewName('')
        setNewNumber('')
      })
  }

  const filterPersons = (filter, persons) => {
    const matchPersons = persons.filter(person => {
      return person.name.toLowerCase().includes(filter.toLowerCase())
    })
    setShownPersons(matchPersons)
  }


  const handleDeleteClickOf = (id) => {
    const person = persons.find(p => p.id === id)

    if (!confirm(`Delete ${person.name}?`)) return
    setPersons(persons.filter(p => p.id !== id))
    personService.deletePerson(id)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>   
      <Persons
        persons={shownPersons}
        handleDeleteClickOf={handleDeleteClickOf}
      />
      <h1>debug: </h1>
      <div>name: {newName}</div>
      <div>number: {newNumber}</div>
      <div>filter {filter}</div>
    </div>
  )
}

export default App