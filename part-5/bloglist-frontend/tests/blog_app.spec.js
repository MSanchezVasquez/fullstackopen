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
      // 1. Creamos un blog para asegurarnos de que existe y somos los creadores
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

      // 3. Interceptamos y aceptamos automáticamente el diálogo window.confirm
      page.once('dialog', (dialog) => dialog.accept())

      // 4. Hacemos clic en el botón de eliminar (ajusta el nombre si en tu app se llama 'remove', 'delete' o 'eliminar')
      await blog.getByRole('button', { name: 'remove' }).click()

      // 5. Verificamos que el blog haya desaparecido de la interfaz
      await expect(blog.getByText('Blog to be deleted')).not.toBeVisible()
    })
  })
})
