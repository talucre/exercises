import { useContext, useState } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { showNotification } = useContext(NotificationContext)

    const checkForm = () => {
        if (!username || !password) {
            showNotification('all fields should be filled', 'error')
            return false
        }
        return true
    }

    const handleSubmit = async event => {
        event.preventDefault()
        if (!checkForm()) return

        await handleLogin({ username, password })

        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        username
                        <input
                            type="text"
                            onChange={({ target }) => setUsername(target.value)}
                            value={username}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        password
                        <input
                            type="password"
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />
                    </label>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm
