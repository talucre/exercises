import { Link } from 'react-router-dom'
import { useGetUsersQuery } from '../reducers/userApi'

const UsersListPage = () => {
    const { data: users, isLoading } = useGetUsersQuery()

    if (isLoading) {
        return <span>loading...</span>
    }

    return (
        <>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <th>
                                <Link to={`/users/${user.id}`}>
                                    {user.name}
                                </Link>
                            </th>
                            <th>{user.blogs.length}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default UsersListPage
