import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks (genre: $genre) {
      title
      author { name, born }
      published
      genres
      id
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const CURRENT_USER = gql`
  query {
    me {
      username,
      favoriteGenre
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: AuthorInput!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author { name, born }
      published
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $born
    ) {
      name
      born
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    )
    {
      value
    }
  }
`