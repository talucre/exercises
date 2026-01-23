import { useParams } from 'react-router-dom'
import { useGetUsersQuery } from '../reducers/userApi'

const UserPage = () => {
    const { data, isLoading } = useGetUsersQuery()
    const { userId } = useParams()

    if (isLoading) {
        return <span>loading...</span>
    }

    const user = data.find(u => u.id === userId)

    return (
        <>
            <h1>{user.name}</h1>
            <h4>added blogs</h4>
            <ul>
                {user.blogs.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </>
    )
}
export default UserPage
