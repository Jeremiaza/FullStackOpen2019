import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [ filters, setFilters] = useState('fin')
  const [ countrydata, setCountryData] = useState()
  const [ temp, setTemp ] = useState()
  const [ wind, setWind ] = useState()
  const [ weather, setWeather ] = useState()


  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilters(event.target.value)
  }

  const handleClick = (event) => {
    console.log(event)
    setFilters(event)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/name/'+filters)
      .then(response => {
        console.log(response.data)
        setCountryData(response.data)
        
      })
  }, [filters])

  const getWeather = (props) => {
    axios
      .get('https://api.openweathermap.org/data/2.5/weather?q='+props+'&APPID=0573e4e29d3d2b5441fb8c7f321a8bb0')
      .then(response => {
        let celsius = response.data.main.temp-273
        setTemp(celsius)
        /*if (response.data.weather[0].description === 'shower rain') {

        } else if (response.data.weather[0].description === 'cloudy') {

        }*/
        setWeather(response.data.weather[0].description)
        setWind('Wind speed: '+response.data.wind.speed + ' direction: ' + response.data.wind.deg + ' degrees')
      })
  }

  const showCountries = () => {
    if (countrydata !== undefined) {
      if (countrydata.length < 10 && countrydata.length > 1) {
        return (
          countrydata.map((x) =>{
          return (
            <div>
              <li>{x.name}</li>
              <button onClick={ () => handleClick(x.name)}>show</button>
            </div>
          )
        })
        )
      }
      else if (countrydata.length === 1) {
        return (
          countrydata.map((x) =>{
          return (
            <div>
              <h1>{x.name}</h1>
              <div>Capital {x.capital}</div>
              <div>Population {x.population}</div>
              <h2>Languages</h2>
              <div>{x.languages.map((y) => {
                return (
                  <li>{y.name}</li>
                )
              })}</div>
              <div><img src={x.flag} alt="Country flag" height="150" width="200"/></div>
              <h2>Weather</h2>
              {getWeather(x.capital)}
              <div>Temperature: {temp} celsius</div>
              <div>Image: {weather}</div>
              <div>wind: {wind}</div>
            </div>
          )
        })
        )
      }
      return (
        <div>
          Too many matches, specify another filter
        </div>
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
