import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('<BlogForm /> updates parent state and calls onSubmit with right details', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm createBlog={createBlog} />)

    const titleInput = container.querySelector('input[name="Title"]')
    const authorInput = container.querySelector('input[name="Author"]')
    const urlInput = container.querySelector('input[name="Url"]')
    const sendButton = screen.getByText('create')

    await user.type(titleInput, 'Testing forms with React Testing Library')
    await user.type(authorInput, 'Moises Sanchez')
    await user.type(urlInput, 'https://fullstackopen.com')

    // Hacemos clic en el botón de crear
    await user.click(sendButton)

    // Verificamos que la función createBlog fue llamada exactamente una vez
    expect(createBlog.mock.calls).toHaveLength(1)

    // Verificamos que los datos enviados correspondan exactamente a lo que se escribió
    expect(createBlog.mock.calls[0][0].title).toBe(
      'Testing forms with React Testing Library',
    )
    expect(createBlog.mock.calls[0][0].author).toBe('Moises Sanchez')
    expect(createBlog.mock.calls[0][0].url).toBe('https://fullstackopen.com')
  })
})
