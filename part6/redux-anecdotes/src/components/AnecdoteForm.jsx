import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
    showNotification,
    hideNotification,
} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const timeoutRef = useRef(null)

    const addAnecdote = event => {
        event.preventDefault()
        if (event.target.anecdote.value.length === 0) return

        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))

        dispatch(showNotification(`You created ${content}`))
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(
            () => dispatch(hideNotification()),
            5000
        )
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
