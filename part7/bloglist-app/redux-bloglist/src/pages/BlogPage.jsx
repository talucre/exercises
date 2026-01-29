import { useNavigate, useParams } from 'react-router-dom'
import {
    useGetBlogsQuery,
    useRemoveBlogMutation,
    useUpdateBlogMutation,
} from '../reducers/blogApi'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

const BlogPage = () => {
    const { data: blogs, isLoading } = useGetBlogsQuery()
    const [updateBlog] = useUpdateBlogMutation()
    const [removeBlog] = useRemoveBlogMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { blogId } = useParams()
    const { user } = useSelector(state => state.user)

    if (isLoading) {
        return <span>loading...</span>
    }

    const blog = blogs.find(b => b.id === blogId)
    const canRemove = blog.user ? blog.user.username === user.username : true

    const handleLike = async id => {
        try {
            const updatedBlog = { ...blog, likes: blog.likes + 1 }
            await updateBlog({ id, ...updatedBlog }).unwrap()
        } catch {
            dispatch(notify({ message: 'failed to like', type: 'error' }))
        }
    }

    const handleDelete = async id => {
        if (
            !window.confirm(
                `Are you sure you want to delete blog ${blog.title}?`,
            )
        )
            return

        try {
            await removeBlog(id)
            navigate(-1)
            dispatch(
                notify({
                    message: `blog ${blog.title} was removed`,
                    type: 'success',
                }),
            )
        } catch (err) {
            dispatch(notify(err))
        }
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
