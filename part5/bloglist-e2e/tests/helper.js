const { expect } = require('@playwright/test')

const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'New blog' }).click()
  await page.getByPlaceholder('Title').fill(title)
  await page.getByPlaceholder('Author').fill(author)
  await page.getByPlaceholder('Url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${author} created a new blog "${title}"`).waitFor()
  await page.getByText(`${title}DeleteView`).waitFor()
}

const likeBlog = async (page, locator, likes) => {
  // Open blog details for the given blog title
  await page.getByText(locator).getByRole('button', { name: 'View' }).click()
  await expect(page.getByText('Likes: 0')).toBeVisible()

  for (let i = 0; i < likes; i++) {
    await page.getByRole('button', { name: 'Like' }).click()
    await page.waitForTimeout(1000)
    await expect(page.getByText(`Likes: ${i + 1}`)).toBeVisible()
  }

  await page.getByRole('button', { name: 'Hide' }).click()
  await expect(page.getByText('Hide')).not.toBeVisible()
}

export { createBlog, likeBlog, loginWith }
