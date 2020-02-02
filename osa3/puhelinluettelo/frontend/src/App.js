import React, { useState, useEffect } from 'react'
import ListPersons from './Components/ListPersons'
import AxiosServices from './Services/service'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    console.log('Get Data')
    AxiosServices
    .getAll()
    .then(response => {
      console.log(response.data)
      setPersons(response.data)
    })
  }
  const addPerson = (event) => {
    event.preventDefault()
    var nameAlreadyExists = false
    persons.forEach(person => {
      if (person.name === newName) {
        nameAlreadyExists = true
        if (person.number !== newNumber) {
          if(window.confirm(person.name + ' already exists, replace number?')) {
            person.number = newNumber
            AxiosServices
            .update(person.id, person)
            .then(response => {
              console.log(response)
            })
            
          }
        }
        else {
          alert(`${newName} on jo luettelossa`)
        }
      }
    });
    if (!nameAlreadyExists) {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      AxiosServices
        .create(personObject)
        .then(response => {
          console.log(response)
          personObject.id = response.data.id
          setPersons(persons.concat(personObject))
          showMessage('Success')
        })
    } 
    
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (x) => {
    console.log(x)
    if (window.confirm('Delete ' +x.name+ "?")) {
    AxiosServices
    .delete(x.id, x)
    .then(response => {
      console.log(response)
      getData()
      showMessage('Deleted')
    })
}
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

  const listPersonsProps = {
    persons,
    filter,
    removePerson: removePerson

    // removePerson: (x)=>removePerson(x)  === removePerson: removePerson
  }
  const showMessage = (props) => {
    setMessage(props)
    setTimeout(() => {
      setMessage(null)
    }, 2500)
  }
  return (
    <div>
      <h2>Puhelinluettelo</h2>
      {message&&(<div className='error'>{message}</div>)}
      <div>rajaa näytettäviä <input value={filter}
        onChange={handleFilterChange} /></div>
      <h2>Lisää uusi</h2>
      <form onSubmit={addPerson}>
        <div> nimi: <input value={newName}
          onChange={handlePersonsChange} />
          <div>numero: <input value={newNumber}
            onChange={handleNumberChange} /></div>
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      
      <ListPersons {...listPersonsProps}/>
    </div>
  )

}
export default App
//{message&&(<div className='error'>{message}</div>)}  Muista alku! hyödyllinen!!