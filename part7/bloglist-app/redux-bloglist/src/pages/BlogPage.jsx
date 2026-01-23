import { useParams } from 'react-router-dom'
import { useGetBlogsQuery } from '../reducers/blogApi'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

const BlogPage = () => {
    const { data: blogs, error, isLoading } = useGetBlogsQuery()
    const dispatch = useDispatch()
    const { blogId } = useParams()
    const { user } = useSelector(state => state.user)

    if (isLoading) {
        return <span>loading...</span>
    }

    const blog = blogs.find(b => b.id === blogId)
    const canRemove = blog.user ? blog.user.username === user.username : true

    const handleLike = async id => {
        console.log('handle like')
    }

    const handleDelete = async id => {
        console.log('handle delete')
    }

    return (
        <>
            <h1>{blog.title}</h1>
            <div>
                url: <span>{blog.url}</span>
            </div>
            <div>
                {blog.likes} likes{' '}
                <button onClick={() => handleLike(blog.id)}>like</button>
            </div>
            <div>added by {blog.author}</div>
            {canRemove && (
                <button onClick={() => handleDelete(blog.id)}>remove</button>
            )}
        </>
    )
}

export default BlogPage
