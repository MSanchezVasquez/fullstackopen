import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders title and author, but not url or likes by default', () => {
    const blog = {
      title: 'Testing React Components',
      author: 'John Doe',
      url: 'https://testing-library.com/',
      likes: 10
    }

    const { container } = render(<Blog blog={blog} />);

    const div = container.querySelector('.blog')
    console.log(div)
    expect(div).toHaveTextContent('Testing React Components')
    expect(div).toHaveTextContent('John Doe');

    const url = screen.queryByText('https://testing-library.com/')
    expect(url).toBeNull()

    const likes = screen.queryByText('likes 10');
    expect(likes).toBeNull()
  })
})