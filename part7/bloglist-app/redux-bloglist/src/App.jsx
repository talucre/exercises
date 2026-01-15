import { useEffect, createRef } from 'react'

import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import BlogsList from './components/BlogsList'
import { initUser, logout } from './reducers/userReducer'

const App = () => {
    const user = useSelector(store => store.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initUser())
    }, [])

    const blogFormRef = createRef()

    if (!user) {
        return (
            <div>
                <h2>blogs</h2>
                <Notification />
                <Login />
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <div>
                {user.name} logged in
                <button
                    onClick={() =>
                        window.confirm('Уверены, что хотите выйти') &&
                        dispatch(logout())
                    }
                >
                    logout
                </button>
            </div>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                <NewBlog />
            </Togglable>
            <BlogsList />
        </div>
    )
}

export default App
