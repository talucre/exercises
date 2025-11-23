import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'
import { render, screen } from '@testing-library/react'
import NotificationContext from '../contexts/NotificationContext'

test('<CreateBlogForm /> calls createBlog with right details', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    const showNotification = vi.fn()
    const notificationContextValue = {
        notification: null,
        showNotification: showNotification,
    }

    render(
        <NotificationContext.Provider value={notificationContextValue}>
            <CreateBlogForm createBlog={createBlog} />
        </NotificationContext.Provider>
    )

    const titleInput = screen.getByLabelText('title')
    const authorInput = screen.getByLabelText('author')
    const urlInput = screen.getByLabelText('url')
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'title test')
    await user.type(authorInput, 'author test')
    await user.type(urlInput, 'url test')

    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
        title: 'title test',
        author: 'author test',
        url: 'url test',
    })
})
