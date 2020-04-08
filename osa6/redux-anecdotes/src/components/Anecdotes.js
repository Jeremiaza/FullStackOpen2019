import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    return (
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() =>
                        dispatch(voteAnecdote(anecdote.id))
                    }
                />
            )}
        </div>
    )
}

export default Anecdotes