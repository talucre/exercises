import { useDispatch, useSelector } from 'react-redux'
import { appendVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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

    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return anecdotes.filter(a =>
            a.content.toLowerCase().includes(filter.toLowerCase())
        )
    })

    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

    const handleVote = id => {
        const anecdote = anecdotes.find(a => a.id === id)

        dispatch(appendVote(anecdote))

        dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
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
