import { useEffect } from 'react'

import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initUser } from './reducers/userReducer'
import AppRouter from './components/AppRouter'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(initUser())
    }, [])

    if (isLoading) {
        return <span>Loading...</span>
    }

    return (
        <BrowserRouter>
            <Notification />
            <AppRouter />
        </BrowserRouter>
    )
}

export default App
