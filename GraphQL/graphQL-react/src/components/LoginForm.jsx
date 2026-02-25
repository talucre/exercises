import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { LOGIN } from '../queries'

const LoginForm = ({ setError, setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login] = useMutation(LOGIN, {
        onCompleted: data => {
            const token = data.login.value
            setToken(token)
            localStorage.setItem('phonebook-user-token', token)
        },
        onError: error => {
            setError(error.message)
        },
    })

    const submit = event => {
        event.preventDefault()
        login({ variables: { username, password } })
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username{' '}
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    password{' '}
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

export default LoginForm
