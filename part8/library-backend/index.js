const { ApolloServer, gql, UserInputError, addResolveFunctionsToSchema } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

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
    authorCount: Int!
    bookCount: Int!
    allBooks(genre: String): [Book]
    allAuthors: [Author!]!
  }

  type Mutation {
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
`

const resolvers = {
  Author: {
    bookCount: root => {
      return Book.find({ author: root._id }).countDocuments()
    }
  },
  Query: {
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
    allAuthors: () => Author.find({})
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author.name })

      try {
        if (!author) {
          author = new Author({ name: args.author.name, born: null })
          author.save()
          const book = new Book({ ...args, author })
          book.save()
          
          return book
        } else {
          const book = new Book({ ...args, author })
          book.save()

          return book
        }
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    editAuthor: async (root, args) => {
      try {
        await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      
      const updatedAuthor = Author.findOne({ name: args.name })
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})