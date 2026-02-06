import { useNavigate, useParams } from 'react-router-dom'
import {
    useAddCommentMutation,
    useGetBlogsQuery,
    useRemoveBlogMutation,
    useUpdateBlogMutation,
} from '../reducers/blogApi'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { useRef } from 'react'

const BlogPage = () => {
    const { data: blogs, isLoading } = useGetBlogsQuery()
    const [updateBlog] = useUpdateBlogMutation()
    const [commentBlog] = useAddCommentMutation()
    const [removeBlog] = useRemoveBlogMutation()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const inputRef = useRef(null)
    const { blogId } = useParams()
    const { user } = useSelector(state => state.user)

    if (isLoading) {
        return <span>loading...</span>
    }

    const blog = blogs.find(b => b.id === blogId)
    const canRemove = blog.user ? blog.user.username === user.username : true

    console.log(blog)

    const handleLike = async () => {
        try {
            const updatedBlog = { ...blog, likes: blog.likes + 1 }
            await updateBlog({ blogId, ...updatedBlog }).unwrap()
        } catch {
            dispatch(notify({ message: 'failed to like', type: 'error' }))
        }
    }

    const handleDelete = async () => {
        if (
            !window.confirm(
                `Are you sure you want to delete blog ${blog.title}?`,
            )
        )
            return

        try {
            await removeBlog(blogId)
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

    const handleAddComment = async event => {
        event.preventDefault()
        const body = inputRef.current.value
        if (body.length < 4) {
            dispatch(notify({ message: `too short comment`, type: 'error' }))
            return
        }

        try {
            await commentBlog({ id: blogId, body: { body } }).unwrap()
            inputRef.current.value = ''
        } catch {
            dispatch(notify({ message: 'failed to comment', type: 'error' }))
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
            <h2>comments</h2>

            <form onSubmit={handleAddComment}>
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="write your comment here"
                />
                <button type="submit">add comment</button>
            </form>

            {blog.comments.length === 0 && <span>no comments yet...</span>}
            {blog.comments.length > 0 && (
                <ul>
                    {blog.comments.map(comment => (
                        <li key={comment.id}>{comment.body}</li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default BlogPage
