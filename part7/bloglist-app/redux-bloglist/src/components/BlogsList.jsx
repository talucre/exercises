import { useState } from 'react'
import {
    useGetBlogsQuery,
    useRemoveBlogMutation,
    useUpdateBlogMutation,
} from '../reducers/blogApi'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false)
    const [updateBlog] = useUpdateBlogMutation()
    const [removeBlog] = useRemoveBlogMutation()
    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch()

    const nameOfUser = blog.user ? blog.user.name : 'anonymous'

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
    }

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
