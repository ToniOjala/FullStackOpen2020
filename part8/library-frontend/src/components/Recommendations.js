import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../queries'

const Recommendations = ({show}) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const [loadBooks, { called, loading, data }] = useLazyQuery(ALL_BOOKS)
  const userResult = useQuery(CURRENT_USER)

  useEffect(() => {
    if (userResult.data) setFavoriteGenre(userResult.data.me.favoriteGenre)
  })

  useEffect(() => {
    if (favoriteGenre) loadBooks({ variables: { genre: favoriteGenre } })
  }, [favoriteGenre]) //eslint-disable-line

  if (!show || userResult.loading || (called && loading)) return null

  if (called) {
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
            {data.allBooks.map(b =>
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
  } else {
    return (
      <button onClick={() => loadBooks({ variables: { genre: favoriteGenre } })}>Load</button>
    )
  }
}

export default Recommendations