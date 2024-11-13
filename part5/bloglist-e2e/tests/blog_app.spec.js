const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Paavo Pesusieni',
        username: 'pesusieni',
        password: 'salainen',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('login page can be opened', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByTestId('username').fill('pesusieni')
    await page.getByTestId('password').fill('salainen')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('Paavo Pesusieni logged in')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'Login' }).click()
      await page.getByTestId('username').fill('pesusieni')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'New blog' }).click()
      await page.getByPlaceholder('Title').fill('playwright blog')
      await page.getByPlaceholder('Author').fill('playwright')
      await page.getByPlaceholder('Url').fill('https://playwright.dev')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText('playwright created a new blog "playwright blog"')).toBeVisible()
    })
  })
})
