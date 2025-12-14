import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) => {
    return (
        <div key={anecdote.id}>
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
    const anecdotes = useSelector(store => store)

    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    console.log(sortedAnecdotes)
    return (
        <>
            {sortedAnecdotes.map(a => (
                <Anecdote
                    anecdote={a}
                    handleVote={() => dispatch(voteFor(a.id))}
                />
            ))}
        </>
    )
}
export default AnecdoteList
