import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/forms/LoginForm'
import CreateBlogForm from './components/forms/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

// TODO rewrite all notification related code for using Context

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

    const addBlog = blogObject => {
        createBlogFormRef.current.toggleVisibility()
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setNotification({
                    title: `a new blog ${blogObject.title} by ${blogObject.author} added`,
                    isError: false,
                })
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
                setBlogs(blogs.concat(returnedBlog))
            })
            .catch(() => {
                setNotification({
                    title: 'Something went wrong',
                    isError: true,
                })
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
    }

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
                        createBlog={addBlog}
                        setNotification={setNotification}
                    />
                </Togglable>
            )}

            {blogs.map(blog => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    setNotification={setNotification}
                />
            ))}
        </div>
    )
}

export default App
