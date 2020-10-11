import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')
    const [notificationMessage, setNotificationMessage] = useState({ type: null, message: null })

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }

        if (testForDupicate(persons).length) {

            let duplicate = testForDupicate(persons)[0]
            if (window.confirm(`'${newName}' is already added to phonebook, replace the old number with a new one?`)) {
                personService
                    .update(duplicate.id, personObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== duplicate.id ? person : returnedPerson))

                        setNotificationMessage({
                            type: "success",
                            message: "Updated " + newName + " succesfully"
                        })
                        setTimeout(() => { setNotificationMessage({ type: null, message: null }) }, 5000)

                    })
                    .catch(error => {
                        setPersons(persons.filter(person => person.id !== duplicate.id))

                        setNotificationMessage({
                            type: "error",
                            message: "Failed to update " + newName + " to phonebook - \n" + newName + " might no longer exixt in phonebook"
                        })
                        console.error(error)
                        setTimeout(() => { setNotificationMessage({ type: null, message: null }) }, 5000)

                    })

                setNewName('')
                setNewNumber('')
            }
        } else if (newName === "") {
            // do nothing
        } else {
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNotificationMessage({
                        type: "success",
                        message: "created " + newName + " succesfully"
                    })
                    setTimeout(() => { setNotificationMessage({ type: null, message: null }) }, 5000)
                    setNewName('')
                    setNewNumber('')
                })
                .catch((error) => {
                    setNotificationMessage({
                        type: "error",
                        message: "Failed to add " + newName + " to phonebook"
                    })
                    console.error(error)
                    setTimeout(() => { setNotificationMessage({ type: null, message: null }) }, 5000)

                })
        }
    }

    const testForDupicate = (persons) => {
        let duplicates = persons.filter(person => (person.name === newName))
        return (duplicates)
    }

    const deletePerson = (id, name) => {
        try {
            if (window.confirm(`Delete ${name} ?`)) {
                personService.remove(id)
                setPersons(persons.filter(person => person.id !== id))
            }
        } catch (e) {
            console.error(e)
        }


    }


    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
    }


    return (
        <div>
            <h2>Phonebook</h2>

            <Notification notificationMessage={notificationMessage} />
            <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />

            <h2>add a new</h2>
            <PersonForm addPerson={addPerson}
                newName={newName} handleNameChange={handleNameChange}
                newNumber={newNumber} handleNumberChange={handleNumberChange} />

            <h2>Numbers</h2>
            <ul>
                <Persons
                    persons={persons}
                    newSearch={newSearch}
                    deletePerson={deletePerson} />
            </ul>
        </div>
    )
}

export default App