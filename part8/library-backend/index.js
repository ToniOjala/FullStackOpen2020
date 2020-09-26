const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.SECRET
const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)
console.log('Connecting to: ', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('Error while connecting to MongoDB: ', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  input AuthorInput {
    name: String!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    me: User
    authorCount: Int!
    bookCount: Int!
    allBooks(genre: String): [Book]
    allGenres: [String!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addBook(
      title: String!
      author: AuthorInput!
      published: Int!
      genres: [String!]!
    ):Book
    editAuthor(
      name: String!
      setBornTo: Int
    ):Author
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books
      if (!args.genre) {
        books = await Book.find({}).populate('author')
      } else {
        books = await Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }

      return books
    },
    allGenres: async () => {
      const books = await Book.find({})
      const genres = []
      books.forEach(book => {
        book.genres.forEach(genre => {
          if (!genres.includes(genre)) genres.push(genre)
        })
      })

      return genres
    },
    allAuthors: () => Author.find({})
  },
  Mutation: {
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, { invalidArgs: args })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'sala123' ) {
        throw new UserInputError('Wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) throw new AuthenticationError('Not authenticated')

      let author = await Author.findOne({ name: args.author.name })

      try {
        if (!author) {
          author = new Author({ name: args.author.name, born: null, bookCount: 1 })
          author.save()
          const book = new Book({ ...args, author })
          book.save()

          pubsub.publish('BOOK_ADDED', { bookAdded: book })
          return book
        } else {
          author.bookCount += 1;
          author.save()
          const book = new Book({ ...args, author })
          book.save()
          
          pubsub.publish('BOOK_ADDED', { bookAdded: book })
          return book
        }
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) throw new AuthenticationError('Not authenticated')

      try {
        await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      
      const updatedAuthor = Author.findOne({ name: args.name })
      return updatedAuthor
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})