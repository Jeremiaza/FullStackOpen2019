
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import Notification from './Notification'
const NewAnecdote = (props) => {
    const [notify, setNotify] = useState(false);
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        setNotify(true)
        setInterval(() => { setNotify(false)
          }, 1500)
        dispatch(createAnecdote(content))
    }

    return (
        <React.Fragment>
            {notify ? <Notification /> : null}
            <form onSubmit={addAnecdote}>
                <input name="anecdote" />
                <button type="submit">add</button>
            </form>
        </React.Fragment>
    )
}

export default NewAnecdote