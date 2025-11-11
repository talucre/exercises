import { useState } from 'react'

const CreateBlogForm = ({ createBlog, setNotification }) => {
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

    const addBlog = event => {
        event.preventDefault()
        if (!checkForm()) return

        createBlog({ title, author, url })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    <label>
                        title
                        <input
                            type="text"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        author
                        <input
                            type="text"
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
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

export default CreateBlogForm
