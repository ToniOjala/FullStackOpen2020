import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { CURRENT_USER } from '../queries'

const Recommendations = (props) => {
  const [books, setBooks] = useState([])
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const userResult = useQuery(CURRENT_USER)

  useEffect(() => {
    if (userResult.data) setFavoriteGenre(userResult.data.me.favoriteGenre)
  })

  useEffect(() => {
    if (favoriteGenre) {
      setBooks(props.books.filter(b => {
        if (b.genres) return b.genres.includes(favoriteGenre)
      }))
    }
  }, [favoriteGenre]) //eslint-disable-line

  if (!props.show || userResult.loading) return null

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
          {books.map(b =>
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