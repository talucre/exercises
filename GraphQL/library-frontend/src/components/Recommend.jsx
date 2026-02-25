import { useQuery } from '@apollo/client/react'
import { ME, ALL_BOOKS } from '../queries'
import BooksTable from './BooksTable'

const Recommendtions = props => {
    const { data: user, loading: userLoading, error: userError } = useQuery(ME)
    const favouriteGenre = user?.me?.favouriteGenre
    const {
        data,
        loading: booksLoading,
        error: booksError,
    } = useQuery(ALL_BOOKS, {
        skip: !favouriteGenre,
        variables: { genre: favouriteGenre },
    })

    if (!props.show) {
        return null
    }

    const isLoading = userLoading || booksLoading
    const isError = userError || booksError

    if (isLoading) {
        return <div>loading...</div>
    }

    if (isError) {
        return <div>something went wrong</div>
    }

    if (!user?.me) {
        return <div>log in to see recommendations</div>
    }

    if (!favouriteGenre) {
        return <div>no favourite genre</div>
    }

    return (
        <div>
            <h2>recommendation</h2>
            <div>
                books in your favourite genre{' '}
                <strong>{user.me.favouriteGenre}</strong>
                {data && <BooksTable books={data.allBooks} />}
            </div>
        </div>
    )
}

export default Recommendtions
