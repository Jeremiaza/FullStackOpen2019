import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ListPersons from './Components/ListPersons'
//import PersonForm from './Components/PersonForm'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filter, setFilter] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/db')
      .then(response => {
        console.log(response.data)
        setPersons(response.data.persons)
      })
  }, [])
  const addPerson = (event) => {
    event.preventDefault()
    var nameAlreadyExists = false
    persons.forEach(person => {
        if (person.name === newName) {
            nameAlreadyExists = true
        } 
    });
    if (!nameAlreadyExists) {
        const personObject = {
            name: newName,
            number: newNumber
        }
        setPersons(persons.concat(personObject))   
    } else {
        alert(`${newName} on jo luettelossa`)
    }
    setNewName('')
    setNewNumber('')
  }

  const handlePersonsChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <div>rajaa näytettäviä <input value={filter}
        onChange={handleFilterChange}/></div>
      <h2>Lisää uusi</h2>
      <form onSubmit={addPerson}>
        <div> nimi: <input value={newName}
        onChange={handlePersonsChange}/>
        <div>numero: <input value={newNumber}
        onChange={handleNumberChange}/></div>
        </div>
        <div>
        <button type="submit">lisää</button>
        </div>
      </form>

      <h2>Numerot</h2>
      {ListPersons({persons}, {filter})}
    </div>
  )

}

export default App