import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const AuthorForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  const submit = async event => {
    event.preventDefault()

    editAuthor({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
    <form onSubmit={submit}>
      <h2>Set birthyear</h2>
      <div>
        name
        <input
          type="text"
          id="name"
          name="name"
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div>
        born
        <input
          type="text"
          id="born"
          name="born"
          onChange={({ target }) => setBorn(Number(target.value))}
        />
      </div>
      <button type="submit">Update Author</button>
    </form>
  )
}

export default AuthorForm