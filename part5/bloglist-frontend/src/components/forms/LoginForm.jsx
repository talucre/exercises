import { useContext, useState } from 'react'
import loginService from '../../services/login'
import blogService from '../../services/blogs'
import Notification from '../Notification'
import NotificationContext from '../contexts/NotificationContext'

const LoginForm = ({ setUser }) => {
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

    const handleLogin = async event => {
        event.preventDefault()
        if (!checkForm()) return

        try {
            const user = await loginService.login({ username, password })
            blogService.setToken(user.token)
            setUser(user)

            window.localStorage.setItem(
                'loggedBloglistUser',
                JSON.stringify(user)
            )

            setUsername('')
            setPassword('')
        } catch {
            showNotification('wrong username or password', 'error')
        }
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
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
