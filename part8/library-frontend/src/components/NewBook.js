import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(ADD_BOOK, {
    update: (store, response) => {
      props.updateCacheWith(response.data.addBook)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    
    addBook({ variables: { title, author: { name: authorName }, published, genres } })

    setTitle('')
    setPublished('')
    setAuthorName('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  if (!props.show) return null

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={authorName}
            onChange={({ target }) => setAuthorName(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook