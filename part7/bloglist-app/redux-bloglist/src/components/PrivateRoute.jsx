import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './Header'
import Navigation from './Navigation'

const PrivateRoute = () => {
    const { user } = useSelector(state => state.user)

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <>
            <Navigation />
            <Header />
            <Outlet />
        </>
    )
}
export default PrivateRoute
