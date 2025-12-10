const loginWith = async (page, username, password) => {
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'create new blog' }).click()
    await page.getByLabel('title').fill(title)
    await page.getByLabel('author').fill(author)
    await page.getByLabel('url').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
    await page.locator('.blog').getByText(title).waitFor()
}

const likeBlog = async (page, title, likes) => {
    await page.getByText(title).getByRole('button', { name: 'view' }).click()

    const likeBtn = await page.getByRole('button', { name: 'like' })

    for (let i = 0; i < likes; i++) {
        await likeBtn.click()
    }

    await page.getByText(title).getByRole('button', { name: 'view' }).click()
}

export { loginWith, createBlog, likeBlog }
