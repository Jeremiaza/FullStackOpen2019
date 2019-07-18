import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [ filters, setFilters] = useState('col')
  const [ countrydata, setCountryData] = useState()
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilters(event.target.value)
  }
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/name/'+filters)
      .then(response => {
        console.log(response.data)
        setCountryData(response.data)
      })
  }, [filters])
  const showCountries = () => {
    if (countrydata !== undefined) {
      return (
        countrydata.map((x) =>{
        return (
          <div>
            <li>{x.name}</li>
          </div>
        )
      })
      )
    }
  }
  return (
    <div>rajaa näytettäviä <input value={filters}
        onChange={handleFilterChange}/>
        <div>{showCountries()}</div>
        </div>
        
        )
}
export default App
