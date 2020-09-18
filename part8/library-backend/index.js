const { ApolloServer, gql, UserInputError } = require('apollo-server')
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
    allBooks(author: String, genre: String): [Book]
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
  Query: {
    authorCount: () => Author.collection().countDocuments(),
    bookCount: () => Book.collection().countDocuments(),
    allBooks: (root, args) => {
      let output = books
      if (args.author) output = output.filter(b => b.author === args.author)
      if (args.genre) output = output.filter(b => b.genres.includes(args.genre))
      return output
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: root => {
      return Book.collection().filter(b => b.author.name === root.name).length
    }
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
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) return null

      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
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