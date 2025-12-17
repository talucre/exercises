import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import {
    hideNotification,
    showNotification,
} from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
    return (
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={handleVote}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const timeoutRef = useRef(null)

    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return anecdotes.filter(a =>
            a.content.toLowerCase().includes(filter.toLowerCase())
        )
    })

    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

    const handleVote = id => {
        dispatch(voteFor(id))
        const anecdote = anecdotes.find(a => a.id === id)

        dispatch(showNotification(`You voted '${anecdote.content}'`))
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(
            () => dispatch(hideNotification()),
            5000
        )
    }

    return (
        <>
            {sortedAnecdotes.map(a => (
                <Anecdote
                    key={a.id}
                    anecdote={a}
                    handleVote={() => handleVote(a.id)}
                />
            ))}
        </>
    )
}
export default AnecdoteList
