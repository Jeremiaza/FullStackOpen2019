import React from 'react'

const ListPersons = ({persons , filter, removePerson}) => {

    return (persons.map((x) => {
        if (x.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 && filter !== '') {
            return (
                <li key={x.name}>{x.name} {x.number + '  '}
                    <button type="submit" onClick={() => { removePerson(x.name) }}>delete</button>
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