import { useDispatch, useSelector } from 'react-redux'
import BlogsList from '../components/BlogsList'
import NewBlog from '../components/NewBlog'
import Notification from '../components/Notification'
import Togglable from '../components/Togglable'

const BlogsListPage = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    return (
        <>
            <Togglable buttonLabel="create new blog">
                <NewBlog />
            </Togglable>
            <BlogsList />
        </>
    )
}
export default BlogsListPage
