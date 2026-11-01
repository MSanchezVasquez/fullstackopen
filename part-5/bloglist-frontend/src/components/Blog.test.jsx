import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders title and author, but not url or likes by default', () => {
    const blog = {
      title: 'Testing React Components',
      author: 'John Doe',
      url: 'https://testing-library.com/',
      likes: 10
    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Testing React Components')
    expect(div).toHaveTextContent('John Doe')

    const url = screen.queryByText('https://testing-library.com/')
    expect(url).toBeNull()

    const likes = screen.queryByText('likes 10')
    expect(likes).toBeNull()
  })

  test('url and likes are shown when the view button is clicked', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Matti Luukkainen',
      url: 'https://fullstackopen.com',
      likes: 5,
      user: {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
      },
    }

    render(<Blog blog={blog} currentUser={{ username: 'mluukkai' }} />)

    // Inicializamos userEvent para simular acciones de usuario
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    // Verificamos que ahora sí aparezcan la URL y los likes
    const urlElement = screen.getByText('https://fullstackopen.com')
    expect(urlElement).toBeDefined()

    const likesElement = screen.getByText('likes 5')
    expect(likesElement).toBeDefined()
  })
})