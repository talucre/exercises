import { useEffect } from 'react'

import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initUser } from './reducers/userReducer'
import AppRouter from './components/AppRouter'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initUser())
    }, [])

    return (
        <BrowserRouter>
            <Notification />
            <AppRouter />
        </BrowserRouter>
    )
}

export default App
