import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

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

    return (
        <>
            {sortedAnecdotes.map(a => (
                <Anecdote
                    key={a.id}
                    anecdote={a}
                    handleVote={() => dispatch(voteFor(a.id))}
                />
            ))}
        </>
    )
}
export default AnecdoteList
