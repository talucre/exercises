import { Route, Routes } from 'react-router-dom'
import UsersListPage from '../pages/UsersListPage'
import LoginPage from '../pages/LoginPage'
import BlogsListPage from '../pages/BlogsListPage'
import PrivateRoute from './PrivateRoute'
import UserPage from '../pages/UserPage'
import BlogPage from '../pages/BlogPage'

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
                <Route path="/" element={<BlogsListPage />} />
                <Route path="/blogs/:blogId" element={<BlogPage />} />
                <Route path="/users" element={<UsersListPage />} />
                <Route path="/users/:userId" element={<UserPage />} />
            </Route>
        </Routes>
    )
}
export default AppRouter
