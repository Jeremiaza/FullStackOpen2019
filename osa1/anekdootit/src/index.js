import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Button = (props) => (
  <button onClick={props.handleClick}>
    next
  </button>
)
  

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes , setVotes] = useState(anecdotes[selected].votes)
  const setSelectedValue = (value) => {
    setSelected(value)
  }

  const giveVote = () => {
    anecdotes[selected].votes += 1
    setVotes(votes+1)
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>       
      <div>
      {props.anecdotes[selected].content}
      <div>
        Has {anecdotes[selected].votes} votes
      </div>
      </div>
      <Button handleClick={() => setSelectedValue(giveRandomNumber())}/>
      <button onClick={giveVote}>
        vote
      </button>
      <h1>Anecdote with the most votes</h1>
      {getHighestVote()}
    </div>
  )
  
}

const getHighestVote = () => {
  const temp = anecdotes.slice(0)
  temp.sort((a, b) => a.votes - b.votes)
  return ( // ascending order, last in the list has the highest votes
    <div>
      <div>
        {temp[5].content}
      </div>
      {temp[5].votes}
      
    </div>
  )
}

const giveRandomNumber = () => {
    const rnd = Math.floor(Math.random() * anecdotes.length)
    return (
        rnd
    )
}




const anecdotes = [
  {content:'If it hurts, do it more often', votes:0},
  {content:'Adding manpower to a late software project makes it later!', votes:0},
  {content:'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes:0},
  {content:'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes:0},
  {content:'Premature optimization is the root of all evil.', votes:0},
  {content:'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes:0}
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)