import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')

    const hook = () => {
        Axios
        // promise
        .get('http://localhost:3001/persons')
        .then(response => {
            // event handler
            setPersons(response.data)
        })
    }

    useEffect(hook, [])


    const addPerson = (event) => {
        event.preventDefault()

        if (testForDupicate(newName, persons)) {
            alert(`${newName} is already added the phonebook`)
        } else {
            const personObject = [
                { name: newName, number: newNumber }
            ]
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
        }
    }

    const testForDupicate = (newName, persons) => {
        let duplicates = persons.filter(person => (person.name === newName))
        return (duplicates.length)
    }

    const handleNameChange = (event) => {
        // console.log(event.target.value)
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
            <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />

            <h2>add a new</h2>
            <PersonForm addPerson={addPerson} 
            newName={newName} handleNameChange={handleNameChange} 
            newNumber={newNumber} handleNumberChange={handleNumberChange}
            />
            
            <h2>Numbers</h2>
            <ul>
                <Persons persons={persons} newSearch={newSearch} />
            </ul>

        </div>
    )
}

export default App