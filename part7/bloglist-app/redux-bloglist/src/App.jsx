import { useState, useEffect, createRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'
import Login from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { notify } from './reducers/notificationReducer'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const user = storage.loadUser()
        if (user) {
            setUser(user)
        }
    }, [])

    const blogFormRef = createRef()

    const handleLogin = async credentials => {
        try {
            const user = await loginService.login(credentials)
            setUser(user)
            storage.saveUser(user)
            dispatch(notify({ message: `Welcome back, ${user.name}` }))
        } catch (error) {
            console.log('notify')
            dispatch(notify({ message: 'Wrong credentials', type: 'error' }))
        }
    }

    const handleCreate = async blog => {
        const newBlog = await blogService.create(blog)
        setBlogs(blogs.concat(newBlog))
        dispatch(
            notify({
                message: `Blog created: ${newBlog.title}, ${newBlog.author}`,
            })
        )
        blogFormRef.current.toggleVisibility()
    }

    const handleVote = async blog => {
        console.log('updating', blog)
        const updatedBlog = await blogService.update(blog.id, {
            ...blog,
            likes: blog.likes + 1,
        })

        dispatch(
            notify({
                message: `You liked ${updatedBlog.title} by ${updatedBlog.author}`,
            })
        )
        setBlogs(blogs.map(b => (b.id === blog.id ? updatedBlog : b)))
    }

    const handleLogout = () => {
        setUser(null)
        storage.removeUser()
        notify(``)
        dispatch(
            notify({
                message: `Bye, ${user.name}!`,
            })
        )
    }

    const handleDelete = async blog => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            await blogService.remove(blog.id)
            setBlogs(blogs.filter(b => b.id !== blog.id))
            notify(``)
            dispatch(
                notify({
                    message: `Blog ${blog.title}, by ${blog.author} removed`,
                })
            )
        }
    }

    if (!user) {
        return (
            <div>
                <h2>blogs</h2>
                <Notification />
                <Login doLogin={handleLogin} />
            </div>
        )
    }

    const byLikes = (a, b) => b.likes - a.likes

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <div>
                {user.name} logged in
                <button onClick={handleLogout}>logout</button>
            </div>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <NewBlog doCreate={handleCreate} />
            </Togglable>
            {blogs.sort(byLikes).map(blog => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleVote={handleVote}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    )
}

export default App
