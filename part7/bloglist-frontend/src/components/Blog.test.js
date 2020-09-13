import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  let blog, component, mockHandler

  beforeEach(() => {
    blog = {
      title: 'test title',
      author: 'test author',
      url: 'test url',
      likes: 5,
      user: {
        name: 'Test User',
        username: 'testuser'
      }
    }

    const loggedInUser = {
      name: 'Test User',
      username: 'testuser'
    }

    mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} loggedInUser={loggedInUser} updateBlog={mockHandler} />
    )
  })

  test('initial rendering is correct', () => {
    const titleAndAuthor = component.getByText(`${blog.title} - by ${blog.author}`)

    expect(titleAndAuthor).toBeDefined()
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent('likes')
  })

  test('url and likes are rendered after contents are toggled', () => {
    const button = component.getByText('Show')
    fireEvent.click(button)

    const url = component.getByText(blog.url)
    const likes = component.getByText(`likes ${blog.likes}`)

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('clicking like twice fires appropriate event handler twice', () => {
    const button = component.getByText('Show')
    fireEvent.click(button)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})