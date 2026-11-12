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

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('input[name="Username"]').fill('testuser')
      await page.locator('input[name="Password"]').fill('sekretpassword')
      await page.getByRole('button', { name: 'login' }).click()

      // Nos aseguramos de que el login fue exitoso
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      await page.locator('input[name="Title"]').fill('Playwright E2E Testing')
      await page.locator('input[name="Author"]').fill('Moises Sanchez')
      await page.locator('input[name="Url"]').fill('https://playwright.dev/')

      await page.getByRole('button', { name: 'create' }).click()

      await expect(
        page.getByText('Playwright E2E Testing Moises Sanchez'),
      ).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.locator('input[name="Title"]').fill('Blog to be liked')
      await page.locator('input[name="Author"]').fill('Moises Sanchez')
      await page
        .locator('input[name="Url"]')
        .fill('https://fullstackopen.com/')
      await page.getByRole('button', { name: 'create' }).click()

      const blog = page
        .getByTestId('blog')
        .filter({ hasText: 'Blog to be liked' })

      await blog.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('likes 0')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be deleted by the user who created it', async ({
      page,
    }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.locator('input[name="Title"]').fill('Blog to be deleted')
      await page.locator('input[name="Author"]').fill('Moises Sanchez')
      await page
        .locator('input[name="Url"]')
        .fill('https://fullstackopen.com/')
      page.on('console', (msg) => {
        console.log('BROWSER:', msg.text())
      })
      await page.getByRole('button', { name: 'create' }).click()

      const blog = page
        .getByTestId('blog')
        .filter({ hasText: 'Blog to be deleted' })

      await blog.getByRole('button', { name: 'view' }).click()

      page.once('dialog', (dialog) => dialog.accept())

      await blog.getByRole('button', { name: 'remove' }).click()

      await expect(blog.getByText('Blog to be deleted')).not.toBeVisible()
    })

    test('blogs are ordered by number of likes with the most liked blog first', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.locator('input[name="Title"]').fill('First Blog - Less Likes')
      await page.locator('input[name="Author"]').fill('Moises Sanchez')
      await page
        .locator('input[name="Url"]')
        .fill('https://fullstackopen.com/1')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText('First Blog - Less Likes')).toBeVisible()

      await page.getByRole('button', { name: 'create new blog' }).click()
      await page
        .locator('input[name="Title"]')
        .fill('Second Blog - More Likes')
      await page.locator('input[name="Author"]').fill('Moises Sanchez')
      await page
        .locator('input[name="Url"]')
        .fill('https://fullstackopen.com/2')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText('Second Blog - More Likes')).toBeVisible()

      const viewButtons = page.getByRole('button', { name: 'view' })

      await viewButtons.nth(1).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('likes 1')).toBeVisible()

      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 2')).toBeVisible()

      const blogElements = page.locator('.blog')

      await expect(blogElements.first()).toContainText(
        'Second Blog - More Likes',
      )
    })
  })

  test.describe('When another user is logged in', () => {
    test.beforeEach(async ({ page, request }) => {
      const secondUser = {
        username: 'otheruser',
        name: 'Other User',
        password: 'otherpassword',
      }
      await request.post('http://localhost:3001/api/users', {
        data: secondUser,
      })
    })

    test('a blog can only be seen and deleted by its creator', async ({
      page,
    }) => {
      await page.locator('input[name="Username"]').fill('testuser')
      await page.locator('input[name="Password"]').fill('sekretpassword')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Test User logged in')).toBeVisible()

      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.locator('input[name="Title"]').fill('Blog by creator only')
      await page.locator('input[name="Author"]').fill('Moises Sanchez')
      await page
        .locator('input[name="Url"]')
        .fill('https://fullstackopen.com/')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText('Blog by creator only')).toBeVisible()

      await page.getByRole('button', { name: 'logout' }).click()
      await expect(page.getByText('Log in to application')).toBeVisible()

      await page.locator('input[name="Username"]').fill('otheruser')
      await page.locator('input[name="Password"]').fill('otherpassword')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Other User logged in')).toBeVisible()

      await page.getByRole('button', { name: 'view' }).click()

      const removeButton = page.getByRole('button', { name: 'remove' })
      await expect(removeButton).not.toBeVisible()
    })
  })
})
