import { useContext, useState } from 'react'
import blogService from '../services/blogs'
import NotificationContext from './contexts/NotificationContext'

const Blog = ({ blog, user, handleDeleteClick }) => {
    const [showDetails, setShowDetails] = useState(false)
    const [likes, setLikes] = useState(blog.likes)
    const showWhenVisible = { display: showDetails ? '' : 'none' }
    const { showNotification } = useContext(NotificationContext)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const toggleVisible = () => {
        setShowDetails(!showDetails)
    }

    const handleLikeClick = async () => {
        try {
            const updatedLikes = likes + 1
            await blogService.update(blog.id, { likes: updatedLikes })
            setLikes(updatedLikes)
        } catch {
            showNotification('something went wrong', 'error')
        }
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}
            <button onClick={toggleVisible}>view</button>
            <div style={showWhenVisible}>
                <div>{blog.url}</div>
                <div>
                    likes {likes}
                    <button onClick={handleLikeClick}>like</button>
                </div>
                <div>{blog.user.name}</div>
                {user.username === blog.user.username && (
                    <div>
                        <button onClick={handleDeleteClick}>delete</button>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Blog
