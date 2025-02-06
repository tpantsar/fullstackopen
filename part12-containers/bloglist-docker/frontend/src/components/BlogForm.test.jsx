import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const TestComponent = () => {
  const blogFormRef = useRef()

  return (
    <Provider store={store}>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm ref={blogFormRef} />
      </Togglable>
    </Provider>
  )
}

test('BlogForm updates parent state and form is closed', async () => {
  const user = userEvent.setup()

  render(<TestComponent />)

  const newBlogButton = screen.getByText('Create new blog')
  await user.click(newBlogButton)

  const title = screen.getByLabelText('Title')
  const author = screen.getByLabelText('Author')
  const url = screen.getByLabelText('Url')

  await user.type(title, 'testing form title')
  await user.type(author, 'testing form author')
  await user.type(url, 'testing form url')

  const createButton = screen.getByText('Create')
  await user.click(createButton)

  // Check if the form fields are reset
  expect(title.value).toBe('')
  expect(author.value).toBe('')
  expect(url.value).toBe('')
})
