const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blog have a property id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    assert(blog.id)
})

test('a valid blog can be added', async () => {
    const newBlog = helper.initialBlogs[0]

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const savedBlog = response.body
    delete savedBlog.id

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    assert.deepStrictEqual(savedBlog, newBlog)
})

test('if blog does not have likes property, it will be setted to 0', async () => {
    const blogWithoutLikes = { ...helper.initialBlogs[0] }
    delete blogWithoutLikes.likes

    const response = await api
        .post('/api/blogs')
        .send(blogWithoutLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const savedBlog = response.body
    assert(savedBlog.likes === 0)
})

test('content missing causes code 400', async () => {
    const blogWithoutTitle = { ...helper.initialBlogs[0] }
    delete blogWithoutTitle.title

    const blogWithoutUrl = { ...helper.initialBlogs[0] }
    delete blogWithoutUrl.url

    const blogWithoutTitleAndUrl = { ...helper.initialBlogs[0] }
    delete blogWithoutTitleAndUrl.title
    delete blogWithoutTitleAndUrl.url

    await api.post('/api/blogs').send(blogWithoutTitle).expect(400)
    await api.post('/api/blogs').send(blogWithoutUrl).expect(400)
    await api.post('/api/blogs').send(blogWithoutTitleAndUrl).expect(400)
})

after(async () => {
    await mongoose.connection.close()
})
