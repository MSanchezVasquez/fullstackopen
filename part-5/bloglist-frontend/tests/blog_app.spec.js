import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')

    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'sekretpassword'
    }
    await request.post('http://localhost:3001/api/users', {
      data: newUser
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()

    const usernameInput = page.locator('input[name="Username"]')
    const passwordInput = page.locator('input[name="Password"]')

    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('testuser')
      await page.locator('input[name="Password"]').fill('sekretpassword')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.locator('input[name="Username"]').fill('testuser')
      await page.locator('input[name="Password"]').fill('wrongpassword')
      await page.getByRole('button', { name: 'login' }).click()

      const errorMessage = page.locator('.error')
      await expect(errorMessage).toBeVisible()
      await expect(errorMessage).toContainText('wrong username or password')

      await expect(page.getByText('Log in to application')).toBeVisible()
    })
  })
})
