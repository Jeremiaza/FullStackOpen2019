import React from 'react'

const ListPersons = ({persons}, {filter}) => {
    return (persons.map((x) =>{
    if (x.name.toLowerCase().indexOf(filter.toLowerCase())!==-1 && filter!=='') {
        return (
              <li key={x.name}>{x.name} {x.number}</li>            
              )
    } else if (filter==='') {
        return (
              <li key={x.name}>{x.name} {x.number}</li>
              )    
    } else return (null)
    
        })
    )}
export default ListPersons