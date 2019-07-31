import React, { useEffect, useState } from 'react'

const Countrydata = (props) => {
  const [countrydata, weather, temp, wind] = props.variables;
  const [state, setState] = useState(false)


  useEffect(() => {
    showCountries()
  })
  const content = () => {
    if (state === 1) {
      return (
        countrydata.map((x, index) => {
          return (
            <div key={index}>
              <li>{x.name}</li>
              <button onClick={() => props.handleClick(x.name)}>show</button>
            </div>
          )
        })
      )
    } else if (state === 2) {

      return (
        countrydata.map((x, index) => {
          return (
            <div key={index}>
              <h1>{x.name}</h1>
              <div>Capital {x.capital}</div>
              <div>Population {x.population}</div>
              <h2>Languages</h2>
              <div>{x.languages.map((y, index) => {
                return (
                  <li key={index}>{y.name}</li>
                )
              })}</div>
              <div><img src={x.flag} alt="Country flag" height="150" width="200" /></div>
              <h2>Weather</h2>
              <div>Temperature: {temp} celsius</div>
              <div><img src={weather} width='50px' height='50px' alt="weatherimage"></img></div>
              <div>wind: {wind}</div>
            </div>
          )
        }
        )
      )
    } else {
      return (
        <div>
          Too many matches, specify another filter
  </div>)
    }
  }
  const showCountries = () => {
    console.log("showCountries")
    if (countrydata !== undefined) {
      if (countrydata.length < 10 && countrydata.length > 1) {
        setState(1)
      }
      else if (countrydata.length === 1) {
        console.log("getWeather")
        props.getWeather(countrydata[0].capital)
        setState(2)
      } else {
        setState(0)
      }
    }
  }

  return (
    <div>
      {content()}
    </div>
  )
}
export default Countrydata;
