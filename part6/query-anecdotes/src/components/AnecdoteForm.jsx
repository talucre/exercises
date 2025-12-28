import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import NotificationContext from '../NotificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const { showNotification } = useContext(NotificationContext)

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: newAnecdote => {
            const anecdotes = queryClient
                .getQueryData(['anecdotes'])
                .concat(newAnecdote)

            queryClient.setQueryData(['anecdotes'], anecdotes)
            showNotification(`anecdote ${newAnecdote.content} created`)
        },
        onError: error => {
            showNotification(error.message)
        },
    })

    const onCreate = event => {
        event.preventDefault()
        const content = event.target.anecdote.value
        // if (content.length < 5) {
        //     return
        // }
        event.target.anecdote.value = ''
        newAnecdoteMutation.mutate({ content, votes: 0 })
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
