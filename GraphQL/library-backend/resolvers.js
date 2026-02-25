const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { GraphQLError } = require('graphql/error')

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (!args.author && !args.genre) {
                return Book.find({}).populate('author')
            }

            if (args.author && !args.genre) {
                const author = await Author.findOne({ name: args.author })

                if (!author) {
                    throw new GraphQLError(`No such author: ${args.author}`, {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.author,
                        },
                    })
                }

                return Book.find({ author: author._id }).populate('author')
            }

            if (!args.author && args.genre) {
                return Book.find({ genres: args.genre }).populate('author')
            }

            if (args.author && args.genre) {
                const author = await Author.findOne({ name: args.author })

                if (!author) {
                    throw new GraphQLError(`No such author: ${args.author}`, {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.author,
                        },
                    })
                }

                return Book.find({
                    author: author._id,
                    genres: args.genre,
                }).populate('author')
            }
        },
        allAuthors: async () => Author.find({}),
    },
    Author: {
        bookCount: async root => {
            return Book.countDocuments({ author: root.id })
        },
    },
    Mutation: {
        addBook: async (root, args) => {
            let author = await Author.findOne({ name: args.author })

            if (!author) {
                author = new Author({ name: args.author })
                try {
                    await author.save()
                } catch (error) {
                    throw new GraphQLError(
                        `Creating the author failed: ${error.message}`,
                        {
                            extensions: {
                                code: 'BAD_USER_INPUT',
                                invalidArgs: args.author,
                                error,
                            },
                        },
                    )
                }
            }

            const book = new Book({ ...args, author: author._id })

            try {
                await book.save()
            } catch (error) {
                throw new GraphQLError(
                    `Creating the book failed: ${error.message}`,
                    {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.title,
                            error,
                        },
                    },
                )
            }

            return book.populate('author')
        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name })

            if (!author) {
                throw new GraphQLError(`No such author ${args.name}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                    },
                })
            }

            author.born = args.setBornTo

            try {
                await author.save()
            } catch (error) {
                throw new GraphQLError(
                    `Editing the author failed: ${error.message}`,
                    {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.name,
                            error,
                        },
                    },
                )
            }

            return author
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favouriteGenre: args.favouriteGenre,
            })

            try {
                await user.save()
            } catch (error) {
                throw new GraphQLError(
                    `Creating the user failed: ${error.message}`,
                    {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.username,
                            error,
                        },
                    },
                )
            }

            return user
        },
    },
}

module.exports = resolvers
