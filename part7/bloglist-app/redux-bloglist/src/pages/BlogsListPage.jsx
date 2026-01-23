import { useDispatch, useSelector } from 'react-redux'
import BlogsList from '../components/BlogsList'
import NewBlog from '../components/NewBlog'
import Notification from '../components/Notification'
import Togglable from '../components/Togglable'
import { useGetBlogsQuery } from '../reducers/blogApi'
import { Link } from 'react-router-dom'

const BlogsListPage = () => {
    const { data: blogs, error, isLoading } = useGetBlogsQuery()

    if (isLoading) {
        return <div>loading...</div>
    }

    if (error) {
        console.log(error)
        dispatch(notify({ message: 'something went wrong...', type: 'error' }))
    }

    const byLikes = (a, b) => b.likes - a.likes
    const sortedBlogs = blogs.slice().sort(byLikes)

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
    }

    return (
        <>
            <Togglable buttonLabel="create new blog">
                <NewBlog />
            </Togglable>
            {sortedBlogs.map(blog => (
                <div key={blog.id} style={style} className="blog">
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title} by {blog.author}
                    </Link>
                </div>
            ))}
        </>
    )
}
export default BlogsListPage
