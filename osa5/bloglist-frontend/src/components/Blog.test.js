import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
const axios = require('axios');

jest.mock('axios');
describe('renders blog content', () => {
  const mockUpdateBlog = jest.fn()

  let component
  const blog = {
    title: 'Blog test title',
    author: 'Blog test author',
    url: 'Blog test url',
    likes: 100,
    id: '1'
  }
  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlog={mockUpdateBlog} />
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.blog-container')
    ).toBeDefined()
  })

  test('Blog url not shown initially', () => {
    const blog = component.container.querySelector('.blog-container')

    expect(blog).not.toHaveTextContent(
      'Blog test url'
    )
  })

  test('Blog likes not shown initially', () => {
    const blog = component.container.querySelector('.blog-container')

    expect(blog).not.toHaveTextContent(
      '100'
    )
  })

  test('after clicking show, blog url is displayed', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const extendedBlog = component.container.querySelector('.blog-container-extended')
    expect(extendedBlog).toHaveTextContent(
      'Blog test url'
    )
  })

  test('after clicking show, blog likes is displayed', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const extendedBlog = component.container.querySelector('.blog-container-extended')
    expect(extendedBlog).toHaveTextContent(
      '100'
    )
  })
  /**
   * This test would work without backend call, but for now it is disabled
   */
  /*test('make sure the updateBlog function is called when liking a blog', () => {
    const button = component.container.querySelector('.likebutton')
    fireEvent.submit(button)

    expect(mockUpdateBlog.mock.calls.length).toBe(1)

  })*/
})