import React from 'react'
import SearchResult from './SearchResult'

const SearchResults = ({ newSearch, countries, setNewSearch }) => {

    if (newSearch === "") {
        return (
            <div> Enter to search for a country </div>
        )
    }

    let filteredCountry = countries.filter(country => (country.name.toLowerCase()).includes(newSearch.toLowerCase()))

    // set change new search
    const handleShowCountryButton = (event) => {
        setNewSearch(event.target.value)
        // setNewSearch(country.name)
    }

    if (filteredCountry.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (filteredCountry.length <= 10 && filteredCountry.length > 1) {
        return (
            <div>
                {filteredCountry.map((country) =>
                    <span key={country.name}>
                        <li>
                            {country.name}&nbsp;
                            <button value={country.name} onClick={handleShowCountryButton}>show</button>
                        </li>
                    </span>

                )}
            </div>

        )
    } else if (filteredCountry.length === 1) {
        return (
            //When the result is one
            filteredCountry.map((country) =>
                <SearchResult key={country.name} country={country} />
            )
        )
    } else {
        return (
            <div>
                No such country exist
            </div>
        )
    }
}

export default SearchResults
