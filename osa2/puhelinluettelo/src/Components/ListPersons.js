import React from 'react'
import AxiosServices from '../Services/service'

const ListPersons = ({ persons }, { filter }) => {
    
    const removePerson = (x) => {
        AxiosServices
        .delete(x.id, x)
        .then(response => {
          console.log(response)
        })
    }
    return (persons.map((x) => {
        if (x.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 && filter !== '') {
            return (
                <li key={x.name}>{x.name} {x.number + '  '}
                    <button type="submit" onClick={() => { removePerson(x) }}>delete</button>
                </li>

            )
        } else if (filter === '') {
            return (
                <li key={x.name}>{x.name} {x.number + '  '}
                    <button type="submit" onClick={() => { removePerson(x) }}>delete</button>
                </li>
            )
        } else return (null)

    })
    )
}
export default ListPersons