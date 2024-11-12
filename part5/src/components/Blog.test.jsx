import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'https://test.com',
    likes: 0,
    user: {
      username: 'testuser',
    },
  }

  const user = {
    username: 'testuser',
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} user={user} likeBlog={mockHandler} deleteBlog={mockHandler} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})
