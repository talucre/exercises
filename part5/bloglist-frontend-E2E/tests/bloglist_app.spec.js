const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helper')

describe('Blogslit app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'test',
                username: 'test',
                password: 'test',
            },
        })
        await request.post('/api/users', {
            data: {
                name: 'test2',
                username: 'test2',
                password: 'test2',
            },
        })
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByLabel('username')).toBeVisible()
        await expect(page.getByLabel('password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    describe('Login', () => {
        test('suceeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'test', 'test')
            await expect(page.getByText('test logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'test', 'wrong password')

            const errorDiv = page.locator('.error')
            await expect(errorDiv).toContainText('wrong credentials')
            await expect(errorDiv).toHaveCSS('border-style', 'solid')
            await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

            await expect(page.getByText('test logged in')).not.toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'test', 'test')
        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(
                page,
                'a blog created by playwright',
                'playwright',
                'test'
            )

            const blog = page.locator('.blog')
            await expect(blog).toBeVisible()
            await expect(blog).toContainText('a blog created by playwright')
        })

        describe('and a blog created', () => {
            beforeEach(async ({ page }) => {
                await createBlog(
                    page,
                    'a blog created by playwright',
                    'playwright',
                    'test'
                )
            })

            test('a blog can be liked', async ({ page }) => {
                const blog = page.locator('.blog')
                await blog.getByRole('button', { name: 'view' }).click()

                await blog.getByRole('button', { name: 'like' }).click()
                // TODO wait for response

                await expect(blog.getByText('likes')).toContainText('1')
            })

            test('a blog can be deleted', async ({ page }) => {
                const blog = page.locator('.blog')
                await blog.getByRole('button', { name: 'view' }).click()

                await blog.getByRole('button', { name: 'delete' }).click()

                page.once('dialog', async dialog => {
                    await expect(dialog.type().toContain('confirm'))
                    await expect(
                        dialog
                            .message()
                            .toContain(
                                'Remove blog a blog created by playwright?'
                            )
                    )
                    await dialog.accept()
                })
            })

            describe('from view of another user', () => {
                beforeEach(async ({ page }) => {
                    await page.getByRole('button', { name: 'logout' }).click()
                    await loginWith(page, 'test2', 'test2')
                })

                test('no delete button of another users blogs', async ({
                    page,
                }) => {
                    const blog = page.locator('.blog')
                    await blog.getByRole('button', { name: 'view' }).click()

                    await expect(
                        blog.getByRole('button', { name: 'delete' })
                    ).not.toBeVisible()
                })
            })
        })

        describe('when several blogs', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, 'blog 1', 'playwright', 'test')
                await createBlog(page, 'blog 2', 'playwright', 'test')
                await createBlog(page, 'blog 3', 'playwright', 'test')
            })

            test('blogs are arranged in the order according to the likes', async ({
                page,
            }) => {
                await likeBlog(page, 'blog 1', 1)
                await likeBlog(page, 'blog 2', 5)
                await likeBlog(page, 'blog 3', 3)

                const blogs = await page.locator('.blog').all()

                await expect(blogs[0]).toContainText('blog 2')
                await expect(blogs[1]).toContainText('blog 3')
                await expect(blogs[2]).toContainText('blog 1')
            })
        })
    })
})
