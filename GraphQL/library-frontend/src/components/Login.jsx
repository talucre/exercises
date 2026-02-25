import { useApolloClient, useMutation } from '@apollo/client/react'
import { useState } from 'react'
import { LOGIN } from '../queries'

const Login = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const client = useApolloClient()

    const [login] = useMutation(LOGIN, {
        onCompleted: data => {
            const token = data.login.value
            props.setToken(token)
            localStorage.setItem('library-user-token', token)
            client.resetStore()
            props.setPage('authors')
        },
        onError: error => {
            alert(error.message)
        },
    })

    const onSubmit = event => {
        event.preventDefault()
        login({ variables: { username, password } })
    }

    if (!props.show) {
        return null
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    username:{' '}
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    password:{' '}
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login
