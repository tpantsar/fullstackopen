import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByRole('textbox', { name: 'Title' })
  const author = screen.getByRole('textbox', { name: 'Author' })
  const url = screen.getByRole('textbox', { name: 'Url' })

  const sendButton = screen.getByText('create')

  await user.type(title, 'testing form title')
  await user.type(author, 'testing form author')
  await user.type(url, 'testing form url')
  await user.click(sendButton)

  const mockCalls = createBlog.mock.calls
  console.log(mockCalls)

  expect(mockCalls).toHaveLength(1)
  expect(mockCalls[0][0].title).toBe('testing form title')
  expect(mockCalls[0][0].author).toBe('testing form author')
  expect(mockCalls[0][0].url).toBe('testing form url')
})
