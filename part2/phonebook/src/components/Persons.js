import React from 'react'
import Person from "./Person"

const Persons = ({ persons, newSearch, deletePerson }) => {


    return (
        <ul>
            {
                persons
                    .filter((person) =>
                        (person.name.toLowerCase()).includes(newSearch.toLowerCase()))
                    .map((filteredPerson) =>
                        <Person
                            key={filteredPerson.name}
                            name={filteredPerson.name}
                            number={filteredPerson.number}
                            deletePerson={() => deletePerson(filteredPerson.id, filteredPerson.name)} />
                    )
            }
        </ul>
    )
}

export default Persons
