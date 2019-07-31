import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Countrydata from "./components/Countrydata"
const App = () => {
  const [filters, setFilters] = useState('')
  const [countrydata, setCountryData] = useState()
  const [temp, setTemp] = useState()
  const [wind, setWind] = useState()
  const [weather, setWeather] = useState()


  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilters(event.target.value)
  }

  const handleClick = (event) => {
    console.log(event)
    setFilters(event)
  }

  useEffect(() => {
    if (filters !== '') {
      axios
        .get('https://restcountries.eu/rest/v2/name/' + filters)
        .then(response => {
          console.log(response.data)
          setCountryData(response.data)
        })
    }
  }, [filters])

  const getWeather = (props) => { // I would like to have conditional rendering on the state variables
    axios
      .get('https://api.openweathermap.org/data/2.5/weather?q=' + props + '&APPID=0573e4e29d3d2b5441fb8c7f321a8bb0')
      .then(response => {
        let celsius = Math.round(response.data.main.temp - 273) * 100 / 100
        setTemp(celsius)
        /*if (response.data.weather[0].description === 'shower rain') {
        
        }  
        } else if (response.data.weather[0].description === 'cloudy') {

        }*/
        setWeather('https://cdn3.iconfinder.com/data/icons/bebreezee-weather-symbols/690/icon-weather-sunrainheavy-512.png')
        setWind('Wind speed: ' + response.data.wind.speed + ' direction: ' + response.data.wind.deg + ' degrees')
      })
  }

  return (
    <div>rajaa näytettäviä <input value={filters}
      onChange={handleFilterChange} />
      <div>
        <Countrydata handleClick={handleClick} getWeather={getWeather} variables={[countrydata, weather, temp, wind]} />
      </div>
    </div>

  )
}
export default App
