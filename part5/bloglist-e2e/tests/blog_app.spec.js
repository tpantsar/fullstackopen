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

    await page.goto('/')
  })

  test('login page can be opened', async ({ page }) => {
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

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'pesusieni', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'playwright blog', 'playwright', 'https://playwright.dev')
      await expect(page.getByText('playwright created a new blog "playwright blog"')).toBeVisible()
    })
  })
})
