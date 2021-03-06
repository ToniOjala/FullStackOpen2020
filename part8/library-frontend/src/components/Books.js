import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_GENRES } from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const genresResult = useQuery(ALL_GENRES)
  let genres = []

  useEffect(() => {
    if (selectedGenre) {
      const filteredBooks = props.books.filter(b => {
        if (b.genres) return b.genres.includes(selectedGenre)
      })
      setBooks(filteredBooks)
    } else {
      setBooks(props.books)
    }
  }, [selectedGenre, props.books]) //eslint-disable-line

  if (!props.show || genresResult.loading) return null

  genres = genresResult.data.allGenres

  return (
    <div>
      <h2>books</h2>

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
      <div>
        {genres.map(g => 
            <button key={g} onClick={() => setSelectedGenre(g)}>{g}</button>  
          )}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books