
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const parts = [
    {
      name: 'Reactin perusteet',
      exercises: 10
    },
    {
      name: 'Tiedonvälitys propseilla',
      exercises: 7
    },
    {
      name: 'Komponenttien tila',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course = {course} />
      <Content parts = {parts} />
      <Total parts = {parts} />
    </div>
  )
}

const Total = (props) => {
    let total = Sum(props.parts[0].exercises, props.parts[1].exercises, props.parts[2].exercises)
    return <div><br></br>Yhteensä {total} harjoitusta</div>
}

const Sum = (p1, p2, p3) => {
    return p1+p2+p3
}

const Header = (props) => {
    return <h1>{props.course}</h1>
}

const Content = (props) => {
    return <div>{props.parts.map(item => <div><b>{item.name}</b>, <br></br>{item.exercises} harjoitusta</div>)}</div>
}


ReactDOM.render(<App />, document.getElementById('root'))