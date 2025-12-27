import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createNote, getNotes, updateNote } from './requests'

const App = () => {
    console.log('rerender')
    const queryClient = useQueryClient()

    const newNoteMutation = useMutation({
        mutationFn: createNote,
        onSuccess: newNote => {
            const notes = queryClient.getQueryData(['notes'])
            queryClient.setQueryData(['notes'], notes.concat(newNote))
        },
    })

    const updateNoteMutation = useMutation({
        mutationFn: updateNote,
        onSuccess: updatedNote => {
            const notes = queryClient
                .getQueryData(['notes'])
                .map(n => (n.id !== updatedNote.id ? n : updatedNote))
            queryClient.setQueryData(['notes'], notes)
        },
    })

    const addNote = async event => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        newNoteMutation.mutate({ content, important: true })
    }

    const toggleImportance = note => {
        updateNoteMutation.mutate({ ...note, important: !note.important })
    }

    const result = useQuery({
        queryKey: ['notes'],
        queryFn: getNotes,
    })

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    const notes = result.data

    return (
        <div>
            <h2>Notes app</h2>
            <form onSubmit={addNote}>
                <input type="text" name="note" />
                <button type="submit">add</button>
            </form>
            {notes.map(note => (
                <li key={note.id} onClick={() => toggleImportance(note)}>
                    {note.content}
                    <strong> {note.important ? 'important' : ''} </strong>
                </li>
            ))}
        </div>
    )
}

export default App
