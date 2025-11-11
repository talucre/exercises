import { forwardRef, useState } from 'react'
import blogService from '../../services/blogs'

const CreateBlogForm = forwardRef(
    ({ blogs, setBlogs, setNotification }, ref) => {
        const [title, setTitle] = useState('')
        const [author, setAuthor] = useState('')
        const [url, setUrl] = useState('')

        const checkForm = () => {
            if (!title || !author || !url) {
                setNotification({
                    title: 'all fields should be filled',
                    isError: true,
                })
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
                return false
            }
            return true
        }

        const handleCreate = async event => {
            event.preventDefault()
            if (!checkForm()) return

            try {
                const returnedBlog = await blogService.create({
                    title,
                    author,
                    url,
                })
                setBlogs(blogs.concat(returnedBlog))

                setNotification({
                    title: `a new blog ${title} by ${author} added`,
                    isError: false,
                })
                setTimeout(() => {
                    setNotification(null)
                }, 5000)

                setTitle('')
                setAuthor('')
                setUrl('')

                if (ref && ref.current) {
                    ref.current.toggleVisibility()
                }
            } catch {
                setNotification({
                    title: 'Something went wrong',
                    isError: true,
                })
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            }
        }

        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={handleCreate}>
                    <div>
                        <label>
                            title
                            <input
                                type="text"
                                value={title}
                                onChange={({ target }) =>
                                    setTitle(target.value)
                                }
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            author
                            <input
                                type="text"
                                value={author}
                                onChange={({ target }) =>
                                    setAuthor(target.value)
                                }
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            url
                            <input
                                type="text"
                                value={url}
                                onChange={({ target }) => setUrl(target.value)}
                            />
                        </label>
                    </div>
                    <button type="submit">create</button>
                </form>
            </div>
        )
    }
)

export default CreateBlogForm
