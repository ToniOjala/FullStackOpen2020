
import React, { useEffect, useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

import { ALL_BOOKS, BOOK_ADDED } from './queries'

const Nav = ({ loggedIn, setPage, logout }) => {

  if (loggedIn) {
    return (
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>
    )
  }
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [books, setBooks] = useState([])
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const booksResult = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (booksResult.data) setBooks(booksResult.data.allBooks)
  })

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
      setBooks(books.concat(addedBook))
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  if (booksResult.loading) return null

  return (
    <div>
      <Nav 
        loggedIn={token !== null}
        setPage={setPage}
        logout={logout}
      />

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
      />

      <Recommendations
        show={page === 'recommendations'}
        books={books}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
      />

    </div>
  )
}

export default App