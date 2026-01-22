import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './Header'

const PrivateRoute = () => {
    const user = useSelector(state => state.user)

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
export default PrivateRoute
