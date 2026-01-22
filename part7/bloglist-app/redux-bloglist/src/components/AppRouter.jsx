import { Route, Routes } from 'react-router-dom'
import UsersListPage from '../pages/UsersListPage'
import LoginPage from '../pages/LoginPage'
import BlogsListPage from '../pages/BlogsListPage'
import PrivateRoute from './PrivateRoute'

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
                <Route path="/" element={<BlogsListPage />} />
                <Route path="/users" element={<UsersListPage />} />
            </Route>
        </Routes>
    )
}
export default AppRouter
