import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../queries'

const Recommendations = ({show}) => {
  const booksResult = useQuery(ALL_BOOKS)
  const userResult = useQuery(CURRENT_USER)

  if (!show || booksResult.loading || userResult.loading) return null

  const books = booksResult.data.allBooks
  const favoriteGenre = userResult.data.me.favoriteGenre
  const filteredBooks = books.filter(b => {
    if (b.genres) return b.genres.includes(favoriteGenre)
  })

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filteredBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations