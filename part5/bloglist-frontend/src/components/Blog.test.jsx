import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title only but not author, url, and likes by default', () => {
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

  render(
    <Blog
      blog={blog}
      user={user}
      likeBlog={mockHandler}
      deleteBlog={mockHandler}
    />
  )

  const title = screen.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(title).toBeDefined()

  const author = screen.queryByText('Author: Test Author')
  expect(author).toBeNull()

  const url = screen.queryByText('URL: https://test.com')
  expect(url).toBeNull()

  const likes = screen.queryByText('Likes: 0')
  expect(likes).toBeNull()
})

test('renders title, author, url, and likes when View button is clicked', async () => {
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

  render(
    <Blog
      blog={blog}
      user={user}
      likeBlog={mockHandler}
      deleteBlog={mockHandler}
    />
  )

  const viewButton = await screen.findByText('View')
  viewButton.click()

  const title = await screen.findByText(
    'Component testing is done with react-testing-library'
  )
  expect(title).toBeDefined()

  const author = await screen.findByText('Author: Test Author')
  expect(author).toBeDefined()

  const url = await screen.findByText('URL: https://test.com')
  expect(url).toBeDefined()

  const likes = await screen.findByText('Likes: 0')
  expect(likes).toBeDefined()
})

test('when like button is clicked two times, expect two mock calls', async () => {
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

  render(
    <Blog
      blog={blog}
      user={user}
      likeBlog={mockHandler}
      deleteBlog={mockHandler}
    />
  )

  const viewButton = await screen.findByText('View')
  viewButton.click()

  const likeButton = await screen.findByText('Like')
  likeButton.click()
  likeButton.click()

  const mockCalls = mockHandler.mock.calls
  console.log(mockCalls)

  expect(mockCalls).toHaveLength(2) // Like button clicked two times
})
