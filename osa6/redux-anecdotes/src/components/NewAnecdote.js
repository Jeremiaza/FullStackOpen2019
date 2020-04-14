
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import Notification from './Notification'
const NewAnecdote = (props) => {
    const [notify, setNotify] = useState(false);

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        setNotify(true)
        props.createNotification("Created " + content)
        setInterval(() => {
            setNotify(false)
        }, 1500)
        props.createAnecdote(content)
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

export default connect(
    null, 
    { createAnecdote,
    createNotification }
  )(NewAnecdote)