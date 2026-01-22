import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = event => {
        event.preventDefault()
        navigate('/')
        dispatch(login({ username, password }))
        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={handleLogin}>
            <label>
                Username:
                <input
                    type="text"
                    data-testid="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    data-testid="password"
                    onChange={e => setPassword(e.target.value)}
                />
            </label>
            <input type="submit" value="Login" />
        </form>
    )
}

export default LoginPage
