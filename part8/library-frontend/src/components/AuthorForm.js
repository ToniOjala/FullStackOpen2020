import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const AuthorForm = ({ authors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [born, setBorn] = useState('')
  const [options, setOptions] = useState([])
  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  const submit = async event => {
    event.preventDefault()

    editAuthor({ variables: { name: selectedAuthor.value, born } })
    
    setSelectedAuthor(null)
    setBorn('')
  }

  useEffect(() => {
    const opts = []
    authors.forEach(a => {
      opts.push({ value: a.name, label: a.name })
    })
    setOptions(opts)
  }, [authors])

  return (
    <form onSubmit={submit}>
      <h2>Set birthyear</h2>
      <Select
        defaultValue={selectedAuthor}
        onChange={setSelectedAuthor}
        options={options}
      />
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