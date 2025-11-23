import { useState } from 'react'

const Blog = ({ blog, user, handleDeleteClick, handleLikeClick }) => {
    const [showDetails, setShowDetails] = useState(false)
    const showWhenVisible = { display: showDetails ? '' : 'none' }
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

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}
            <button onClick={toggleVisible}>view</button>
            <div className="blog__details" style={showWhenVisible}>
                <div>{blog.url}</div>
                <div>
                    likes {blog.likes}
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
