import React from 'react'
// import Weather from './Weather'

const SearchResult = ({ country }) => {

    return (

        <div>
            <h1>{country.name}</h1>
            capital: {country.capital}  <br />
            population: {country.population} <br />

            <h2>Languages:</h2>
            <p>
                {country.languages
                    .map((language) =>
                        <li key={language.name}>{language.name}</li>
                    )
                }
            </p>

            <img src={country.flag} alt={country.name.concat(" flag")} length="100px" width="100px" />

            {/* <Weather city={country.capital}/> */}
        </div>

    )
}

// capital, population , language

export default SearchResult


