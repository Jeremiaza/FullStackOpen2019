import React from 'react'

const PersonForm = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ])
      const [ filter, setFilter] = useState('')
      const [ newName, setNewName ] = useState('')
      const [ newNumber, setNewNumber ] = useState('')
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
    return (
        <form onSubmit={addPerson}>
        <div>nimi: <input value={newName}
        onChange={handlePersonsChange}/>
        <div>numero: <input value={newNumber}
        onChange={handleNumberChange}/></div>
        </div>
        <div>
        <button type="submit">lisää</button>
        </div>
      </form>
    )
}
export default PersonForm 