import { useState } from 'react'
import storage from '../services/storage'
import {
    useGetBlogsQuery,
    useRemoveBlogMutation,
    useUpdateBlogMutation,
} from '../reducers/blogApi'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false)
    const [updateBlog] = useUpdateBlogMutation()
    const [removeBlog] = useRemoveBlogMutation()
    const dispatch = useDispatch()

    const handleLike = async () => {
        try {
            const updatedData = {
                ...blog,
                likes: blog.likes + 1,
            }
            await updateBlog({ id: blog.id, ...updatedData }).unwrap()
        } catch {
            dispatch(notify({ message: 'failed to like blog', type: 'error' }))
        }
    }

    const handleDelete = async () => {
        try {
            if (window.confirm(`Are you sure to delete blog ${blog.title}?`)) {
                await removeBlog(blog.id).unwrap()
                dispatch(
                    notify({
                        message: `blog ${blog.title} successfully removed`,
                        type: 'success',
                    })
                )
            }
        } catch {
            dispatch(
                notify({ message: 'failed to delete blog', type: 'error' })
            )
        }
    }

    const nameOfUser = blog.user ? blog.user.name : 'anonymous'

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
    }

    const canRemove = blog.user ? blog.user.username === storage.me() : true

    return (
        <div style={style} className="blog">
            {blog.title} by {blog.author}
            <button
                style={{ marginLeft: 3 }}
                onClick={() => setVisible(!visible)}
            >
                {visible ? 'hide' : 'view'}
            </button>
            {visible && (
                <div>
                    <div>
                        <a href={blog.url}>{blog.url}</a>
                    </div>
                    <div>
                        likes {blog.likes}
                        <button
                            style={{ marginLeft: 3 }}
                            onClick={() => handleLike(blog)}
                        >
                            like
                        </button>
                    </div>
                    <div>{nameOfUser}</div>
                    {canRemove && (
                        <button onClick={() => handleDelete(blog)}>
                            remove
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

const BlogsList = () => {
    const { data, error, isLoading } = useGetBlogsQuery()
    const dispatch = useDispatch()

    if (isLoading) {
        return <div>loading...</div>
    }

    if (error) {
        console.log(error)
        dispatch(notify({ message: 'something went wrong...', type: 'error' }))
    }

    const byLikes = (a, b) => b.likes - a.likes
    const sortedBlogs = data.slice().sort(byLikes)

    return (
        <div>
            {sortedBlogs.map(blog => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleVote={() => console.log('vote')}
                    handleDelete={() => console.log('delete')}
                />
            ))}
        </div>
    )
}

export default BlogsList
