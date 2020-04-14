import React, { useState } from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import Notification from './Notification'
const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <React.Fragment>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes} votes {' '}
                <button onClick={handleClick}>vote</button>
            </div>
        </React.Fragment>
    )
}

const Anecdotes = (props) => {
    const [notify, setNotify] = useState(false);
    let timeoutId;
    function showNotification(to) {
        setNotify(true)
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            setNotify(false)
        }, to);
    }
    return (
        <div>
            {props.anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => {
                        props.createNotification("Voted " + anecdote.content)
                        showNotification(2000)
                        props.voteAnecdote(anecdote.id)
                    }
                    }
                />
            )}
            {notify ? <Notification /> : null}
        </div>
    )
}

const mapStateToProps = (state) => {
    if (state.filter === 'ALL' || state.filter === '') {
        return { anecdotes: state.anecdotes }
    }
    return {
        anecdotes: state.filter
            ? state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
            : null//anecdotes.filter(anecdote => !anecdote.includes(filter))
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    createNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Anecdotes)