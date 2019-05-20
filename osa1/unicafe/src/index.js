import React, { useState } from 'react'
import ReactDOM from 'react-dom'  
const Statistics = (hyvä, neutraali, huono) => {
  if (hyvä<=0 && neutraali<=0 && huono<=0) {
    return (
      <div>Ei yhtään palautetta annettu</div>
    )
  } else {
    return (
      <table>
          <tbody>
          <tr><th align="left">Hyvä</th><td>{hyvä}</td></tr>
          <tr><th align="left">Neutraali</th><td>{neutraali}</td></tr>
          <tr><th align="left">Huono</th><td>{huono}</td></tr>
          <tr><th align="left">Yhteensä</th><td>{huono+hyvä+neutraali}</td></tr>
          <tr><th align="left">Keskiarvo</th><td>{(hyvä-huono)/(hyvä+huono+neutraali)}</td></tr>
          <tr><th align="left">Positiivisia</th><td>{(hyvä/(hyvä+huono+neutraali))*100}%</td></tr>
          </tbody>
      </table>
    )
  }
 
}

const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const setGoodValue = (value) => {
    return () => {
      setGood(value)
    }
  }
  const setBadValue = (value) => {
    return () => {
      setBad(value)
    }
  }
  const setNeutralValue = (value) => {
    return () => {
      setNeutral(value)
    }
  }
  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )
  return (
    
    <div>

    <h1>Anna palautetta</h1>
      <Button handleClick={setGoodValue(good + 1)}
        text='hyva'
      />
      <Button handleClick={setNeutralValue(neutral + 1)}
        text='neutraali'
      />
      <Button handleClick={setBadValue(bad + 1)}
        text='huono'
      />
      <h1>Statistiikka</h1>
      {Statistics(good, neutral, bad)}  
    </div>
    
  )
}


ReactDOM.render(<App />, 
document.getElementById('root')
)