import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, voteForAnecdote } from './requests'

const App = () => {
    const queryClient = useQueryClient()

    const {
        isPending,
        isError,
        data: anecdotes,
    } = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAll,
        retry: 1,
    })

    const voteForMutation = useMutation({
        mutationFn: voteForAnecdote,
        onSuccess: updatedAnecdote => {
            const anecdotes = queryClient
                .getQueryData(['anecdotes'])
                .map(a => (a.id !== updatedAnecdote.id ? a : updatedAnecdote))

            queryClient.setQueryData(['anecdotes'], anecdotes)
        },
    })

    const handleVote = anecdote => {
        voteForMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    }

    if (isPending) {
        return <div>Loading...</div>
    }

    if (isError) {
        return (
            <div>anecdote service not available due to problems in server</div>
        )
    }

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default App
