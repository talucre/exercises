import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    if (user === null) {
        return <LoginForm setUser={setUser} setNotification={setNotification} />
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
        blogService.setToken(null)
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification notification={notification} />
            <div>
                {user.name} logged in{' '}
                <button onClick={handleLogout}>logout</button>
            </div>

            {user && (
                <CreateBlogForm
                    blogs={blogs}
                    setBlogs={setBlogs}
                    setNotification={setNotification}
                />
            )}

            {blogs.map(blog => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default App
