import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useMutation, useQuery } from '@apollo/client/react'

const AuthorForm = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const { data } = useQuery(ALL_AUTHORS)
    const [editAuthor, { error }] = useMutation(EDIT_AUTHOR, {
        onCompleted: data => {
            if (!data.editAuthor) {
                console.log('something went wrong')
            }
        },
    })

    const submit = event => {
        event.preventDefault()

        editAuthor({ variables: { name, setBornTo: Number(born) } })

        setName('')
        setBorn('')
    }

    if (error) {
        return <div>something went wrong</div>
    }

    return (
        <form onSubmit={submit}>
            <h2>Set birthyear</h2>
            <div>
                name
                <select value={name} onChange={e => setName(e.target.value)}>
                    {data.allAuthors.map(a => (
                        <option key={a.id} value={a.name}>
                            {a.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                born
                <input
                    type="number"
                    value={born}
                    onChange={e => setBorn(e.target.value)}
                    required
                />
            </div>
            <button type="submit">update author</button>
        </form>
    )
}

export default AuthorForm
