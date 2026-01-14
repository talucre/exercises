import { useState, useEffect, createRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'
import Login from './components/Login'
import Blog from './components/BlogsList'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import BlogsList from './components/BlogsList'
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

    if (!user) {
        return (
            <div>
                <h2>blogs</h2>
                <Notification />
                <Login doLogin={handleLogin} />
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <div>
                {user.name} logged in
                <button onClick={handleLogout}>logout</button>
            </div>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <NewBlog />
            </Togglable>
            <BlogsList />
        </div>
    )
}

export default App
