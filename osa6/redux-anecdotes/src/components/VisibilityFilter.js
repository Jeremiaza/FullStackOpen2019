
import React, { useState } from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = () => {
    const dispatch = useDispatch()
    const [filterInput, setfilterInput] = useState('')

    const handleChange = (event) => {
        setfilterInput(event.target.value)
        dispatch(filterChange(event.target.value))
    }

    return (
        <div style={{marginBottom:10}}>
            Filter:
            <input type="text" name="name" onChange={handleChange} value={filterInput} />
        </div>
    )
}

export default VisibilityFilter