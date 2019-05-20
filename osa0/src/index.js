import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
    return (
      <div>
        <p>Hello {props.name}, you are {props.age} years old</p>
      </div>
    )
  }

const App = () => {
    const now = new Date()
    const a = 10
    const b = 22
  
    return (
      <div>
        <p>Hello world, it is {now.toString()}</p>
        <p>
          {a} plus {b} is {a + b}
        </p>
        <Hello name = "Pekka" age = {a+b}/>
      </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
