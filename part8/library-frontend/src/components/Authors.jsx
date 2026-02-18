import { useQuery } from '@apollo/client/react'
import { ALL_AUTHORS } from '../queries'
import AuthorForm from './AuthorForm'

const Authors = props => {
    const { data, loading, error } = useQuery(ALL_AUTHORS)

    if (!props.show) {
        return null
    }

    if (loading) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>something went wrong</div>
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {data.allAuthors.map(a => (
                        <tr key={a.id}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AuthorForm />
        </div>
    )
}

export default Authors
