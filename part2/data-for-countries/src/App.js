import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Search from './components/Search'
import SearchResults from './components/SearchResults'

const App = () => {
  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])

  const hook = () => {
    Axios
      // promise
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        // event handler
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
}


  return (
    <>
      <Search newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <SearchResults newSearch={newSearch} setNewSearch={setNewSearch} countries={countries} />
    </>
  )
}

export default App;
