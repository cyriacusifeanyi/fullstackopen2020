import React from 'react'
import Person from "./Person"

const Persons = ({ persons, newSearch }) => {
    return (
        persons.filter(person => (person.name.toLowerCase()).includes(newSearch.toLowerCase())).map((filteredPerson) =>
            <Person key={filteredPerson.name} name={filteredPerson.name} number={filteredPerson.number} />
        )
    )
}

export default Persons
