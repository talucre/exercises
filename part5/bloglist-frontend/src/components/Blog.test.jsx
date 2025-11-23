import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const blog = {
    author: 'admin',
    id: '123456789',
    likes: 0,
    title: 'a blog for a test',
    url: 'testURL',
    user: {
        id: '987654321',
        name: 'admin',
        username: 'admin',
    },
}

const user = {
    name: 'admin',
    token: 'qweqweqwe',
    usernamne: 'admin',
}

test('<Blog /> at start renders only title and author', () => {
    const { container } = render(<Blog blog={blog} user={user} />)
    screen.getByText('a blog for a test', { exact: false })
    screen.getByText('admin')

    const details = container.querySelector('.blog__details')
    expect(details).not.toBeVisible()
})

test('<Blog /> after clicking the button, details are dispayed', async () => {
    const user = userEvent.setup()
    const { container } = render(<Blog blog={blog} user={user} />)
    const button = screen.getByText('view')
    await user.click(button)

    const details = container.querySelector('.blog__details')
    expect(details).toBeVisible()
})

test('<Blog /> calling handleLikeClick twice if the like button pressed twice', async () => {
    const handleLikeClick = vi.fn()
    const user = userEvent.setup()

    render(<Blog blog={blog} user={user} handleLikeClick={handleLikeClick} />)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleLikeClick.mock.calls).toHaveLength(2)
})
