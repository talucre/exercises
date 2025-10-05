const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favouriteBlog = blogs => {
    if (blogs.length === 0) return null

    let favouriteBlog = blogs[0]

    for (let blog of blogs) {
        if (blog.likes > favouriteBlog.likes) {
            favouriteBlog = blog
        }
    }

    return favouriteBlog
}

const mostBlogs = blogs => {
    if (blogs.length === 0) return null
    const map = new Map()

    for (let blog of blogs) {
        if (map.has(blog.author)) {
            const blogsAmount = map.get(blog.author) + 1
            map.set(blog.author, blogsAmount)
        } else {
            map.set(blog.author, 1)
        }
    }

    let mostBlogs = {
        author: map.keys().next().value,
        blogs: map.values().next().value,
    }

    for (let [author, blogsAmount] of map.entries()) {
        if (blogsAmount > mostBlogs.blogs) {
            mostBlogs = {
                author: author,
                blogs: blogsAmount,
            }
        }
    }

    return mostBlogs
}

const mostLikes = blogs => {
    if (blogs.length === 0) return null
    const map = new Map()

    for (let blog of blogs) {
        if (map.has(blog.author)) {
            const likesAmount = map.get(blog.author) + blog.likes
            map.set(blog.author, likesAmount)
        } else {
            map.set(blog.author, blog.likes)
        }
    }

    let mostLikes = {
        author: map.keys().next().value,
        likes: map.values().next().value,
    }

    for (let [author, likes] of map.entries()) {
        if (likes > mostLikes.likes) {
            mostLikes = {
                author: author,
                likes: likes,
            }
        }
    }

    return mostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
}
