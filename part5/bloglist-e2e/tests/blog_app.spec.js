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

  describe('when logged in and blog created', () => {
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
      await page.getByRole('button', { name: 'View' }).click()

      await createBlog(page, 'blog with 2 likes', 'playwright2', 'https://playwright.dev')
      await page.getByRole('button', { name: 'View' }).click()

      await createBlog(page, 'blog with 3 likes', 'playwright3', 'https://playwright.dev')
      await page.getByRole('button', { name: 'View' }).click()

      //await page.getByRole('button', { name: 'Like' }).click()
      const likeButtons = await page.locator('.like-button').all()
      //const likeButtons = await page.locator('button', { class: 'Like' }).all()

      await likeButtons[0].click()
      await likeButtons[1].click()
      await likeButtons[1].click()
      await likeButtons[2].click()
      await likeButtons[2].click()
      await likeButtons[2].click()

      //const likes = await page.locator('.likes')
      await page.pause()
      const likesTexts = await page.getByTestId('blog-likes').allInnerTexts()
      console.log(likesTexts)
      await expect(likesTexts).toEqual(['Likes: 3', 'Likes: 2', 'Likes: 1'])

      const blogTitles = await page.getByTestId('blog-title').all()
      await expect(blogTitles).toEqual([
        'blog with 3 likes',
        'blog with 2 likes',
        'blog with 1 like',
      ])

      //const likesTexts = await Promise.all(likes.map((like) => like.innerText()))
      //await expect(likesTexts).toEqual(['2', '1', '0'])
      //
      //const viewButtons = await page.locatorAll('button', { name: 'View' })
      //await viewButtons[0].click()
      //await expect(page.getByTestId('blog-title')).toHaveText('blog 1')
      //
      //const blogTitles = await page.locatorAll('.blog-title')
      //const blogTitlesTexts = await Promise.all(blogTitles.map((title) => title.innerText()))
      //await expect(blogTitlesTexts).toEqual(['blog 1', 'blog 2', 'blog 3'])
    })
  })
})
