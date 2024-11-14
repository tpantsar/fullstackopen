const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')

    await request.post('/api/users', {
      data: {
        name: 'Paavo Pesusieni',
        username: 'pesusieni',
        password: 'salainen',
      },
    })

    await request.post('/api/users', {
      data: {
        name: 'Paavo Pesusieni 2',
        username: 'pesusieni2',
        password: 'salainen',
      },
    })

    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  test('user can log in with correct credentials', async ({ page }) => {
    await loginWith(page, 'pesusieni', 'salainen')
    await expect(page.getByText('Paavo Pesusieni logged in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'pesusieni', 'wrong')

    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('incorrect username or password')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('Paavo Pesusieni logged in')).not.toBeVisible()
  })

  describe('when logged in and one blog created', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'pesusieni', 'salainen')
      await createBlog(page, 'playwright blog', 'playwright', 'https://playwright.dev')
      await expect(page.getByText('playwright created a new blog "playwright blog"')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'pesusieni blog', 'pesusieni', 'https://pesusieni.net')
      await expect(page.getByText('pesusieni created a new blog "pesusieni blog"')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'View' }).click()
      await expect(page.getByText('Likes: 0')).toBeVisible() // Likes: 0
      await page.getByRole('button', { name: 'Like' }).click()
      await expect(page.getByText('Likes: 1')).toBeVisible() // Likes: 1
    })

    test('a blog can be deleted by correct user', async ({ page }) => {
      // Open the blog details
      await page.getByRole('button', { name: 'View' }).click()

      // By default, dialogs are auto-dismissed by Playwright, so we need to accept it first
      page.on('dialog', async (dialog) => {
        if (dialog.type() === 'confirm') {
          await dialog.accept()
        }
      })

      await page.getByRole('button', { name: 'Delete' }).click()
      await page.waitForSelector('.success')
      await expect(page.getByTestId('blog-title')).not.toBeVisible()
      await expect(page.getByText('Likes: 0')).not.toBeVisible()
    })

    test('a blog cannot be deleted by another user', async ({ page }) => {
      await page.getByRole('button', { name: 'Log out' }).click()

      // Login with another user
      await loginWith(page, 'pesusieni2', 'salainen')
      await expect(page.getByText('Paavo Pesusieni 2 logged in')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible()
    })

    test('a blog creator can only see the delete button', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible()
    })

    test('blogs are sorted by likes in descending order', async ({ page }) => {
      await createBlog(page, 'blog with 1 like', 'playwright1', 'https://playwright.dev')
      await createBlog(page, 'blog with 3 likes', 'playwright2', 'https://playwright.dev')

      await page
        .getByText('blog with 1 likeDeleteView')
        .getByRole('button', { name: 'View' })
        .click()

      await page.getByRole('button', { name: 'Like' }).click()
      await expect(page.getByText('Likes: 1')).toBeVisible()
      await page
        .getByText('blog with 1 likeDeleteHide')
        .getByRole('button', { name: 'Hide' })
        .click()

      await page
        .getByText('blog with 3 likesDeleteView')
        .getByRole('button', { name: 'View' })
        .click()

      // Like the blog 3 times
      for (let i = 0; i < 3; i++) {
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText(`Likes: ${i + 1}`)).toBeVisible()
      }

      await page
        .getByText('blog with 3 likesDeleteHide')
        .getByRole('button', { name: 'Hide' })
        .click()

      const expectedTitles = ['blog with 3 likes', 'blog with 1 like', 'playwright blog']
      const blogTitles = await page.getByTestId('blog-title').allTextContents()
      console.log('blogTitles', blogTitles)

      await expect(blogTitles).toEqual(expectedTitles)
    })
  })
})
