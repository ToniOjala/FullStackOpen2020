import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('initial rendering is correct', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 5
  }

  const component = render(
    <Blog blog={blog} />
  )

  const titleAndAuthor = component.getByText(`${blog.title} - by ${blog.author}`)

  expect(titleAndAuthor).toBeDefined()
  expect(component.container).not.toHaveTextContent(blog.url)
  expect(component.container).not.toHaveTextContent('likes')
})