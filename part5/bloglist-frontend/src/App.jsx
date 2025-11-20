import { useState, useEffect, useRef, useContext } from 'react'
import NotificationContext from './components/contexts/NotificationContext'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/forms/LoginForm'
import CreateBlogForm from './components/forms/CreateBlogForm'
import Togglable from './components/Togglable'

// TODO проверить blog delete на беке

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

    const handleLogin = async credentials => {
        try {
            const user = await loginService.login(credentials)
            blogService.setToken(user.token)
            setUser(user)

            window.localStorage.setItem(
                'loggedBloglistUser',
                JSON.stringify(user)
            )
        } catch {
            showNotification('wrong username or password', 'error')
        }
    }

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

    const handleDeleteClick = async blog => {
        if (!window.confirm(`Remove blog ${blog.title}`)) return

        try {
            await blogService.deleteBlog(blog.id)
            setBlogs(blogs.filter(b => b.id !== blog.id))
        } catch {
            showNotification('something went wrong', 'error')
        }
    }

    const handleLikeClick = async blog => {
        try {
            const updatedLikes = blog.likes + 1
            await blogService.update(blog.id, { likes: updatedLikes })
            setBlogs(prevBlogs =>
                prevBlogs.map(b =>
                    b.id === blog.id ? { ...b, likes: updatedLikes } : b
                )
            )
        } catch {
            showNotification('something went wrong', 'error')
        }
    }

    const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)

    if (user === null) {
        return <LoginForm handleLogin={handleLogin} />
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

            {sortedBlogs.map(blog => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    user={user}
                    handleDeleteClick={() => handleDeleteClick(blog)}
                    handleLikeClick={() => handleLikeClick(blog)}
                />
            ))}
        </div>
    )
}

export default App
