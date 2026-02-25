import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient } from '@apollo/client/react'
import Recommendtions from './components/Recommend'

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(
        localStorage.getItem('library-user-token'),
    )
    const client = useApolloClient()

    const onLogout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
        setPage('authors')
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token && (
                    <>
                        <button onClick={() => setPage('recommendations')}>
                            recommend
                        </button>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button onClick={onLogout}>logout</button>
                    </>
                )}
                {!token && (
                    <button onClick={() => setPage('login')}>login</button>
                )}
            </div>

            <Authors show={page === 'authors'} />

            <Books show={page === 'books'} />

            <NewBook show={page === 'add'} />

            <Recommendtions show={page === 'recommendations'} />

            <Login
                show={page === 'login'}
                setToken={setToken}
                setPage={setPage}
            />
        </div>
    )
}

export default App
