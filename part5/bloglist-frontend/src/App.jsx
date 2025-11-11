import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/forms/LoginForm'
import CreateBlogForm from './components/forms/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBloglistUser')
        setUser(null)
        blogService.setToken(null)
    }

    const createBlogFormRef = useRef()

    if (user === null) {
        return <LoginForm setUser={setUser} setNotification={setNotification} />
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
                <Togglable
                    buttonLabel="create new blog"
                    ref={createBlogFormRef}
                >
                    <CreateBlogForm
                        blogs={blogs}
                        setBlogs={setBlogs}
                        setNotification={setNotification}
                        ref={createBlogFormRef}
                    />
                </Togglable>
            )}

            {blogs.map(blog => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default App
