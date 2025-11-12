import { useState, useEffect, useRef, useContext } from 'react'
import NotificationContext from './components/contexts/NotificationContext'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/forms/LoginForm'
import CreateBlogForm from './components/forms/CreateBlogForm'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const { showNotification } = useContext(NotificationContext)

    useEffect(() => {
        const fetchBlogs = async () => {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
        fetchBlogs()
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

    const addBlog = async blogObject => {
        try {
            const returnedBlog = await blogService.create(blogObject)
            showNotification(
                `a new blog ${blogObject.title} by ${blogObject.author} added`
            )
            setBlogs(blogs.concat(returnedBlog))
        } catch {
            showNotification('Something went wrong', 'error')
        }
        createBlogFormRef.current.toggleVisibility()
    }

    if (user === null) {
        return <LoginForm setUser={setUser} />
    }

    return (
        <div>
            <h2>blogs</h2>
            <div>
                {user.name} logged in{' '}
                <button onClick={handleLogout}>logout</button>
            </div>

            {user && (
                <Togglable
                    buttonLabel="create new blog"
                    ref={createBlogFormRef}
                >
                    <CreateBlogForm createBlog={addBlog} />
                </Togglable>
            )}

            {blogs.map(blog => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default App
