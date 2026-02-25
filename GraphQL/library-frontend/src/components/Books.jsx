import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'
import BooksTable from './BooksTable'

const Books = props => {
    const [genre, setGenre] = useState(undefined)
    const { data, loading, error } = useQuery(ALL_BOOKS, {
        variables: { genre },
        fetchPolicy: 'cache-and-network',
    })

    if (!props.show) {
        return null
    }

    if (loading) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>something went wrong</div>
    }

    const allGenres = [
        ...new Set(data.allBooks.map(book => book.genres).flat()),
    ]
    console.log(allGenres)

    return (
        <div>
            <h2>books</h2>
            {genre && (
                <span>
                    in genre <strong>{genre}</strong>
                </span>
            )}
            <BooksTable books={data.allBooks} />
            <div>
                {allGenres.map(genre => (
                    <button key={genre} onClick={() => setGenre(genre)}>
                        {genre}
                    </button>
                ))}
                <button onClick={() => setGenre(undefined)}>all genres</button>
            </div>
        </div>
    )
}

export default Books
