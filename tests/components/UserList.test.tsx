import UserList from '@/components/UserList'
import { User } from '@/entities'
import { render, screen } from '@testing-library/react'

describe('UserList', () => {
  it('should render a list of user links', () => {
    const users: User[] = [
      { id: 1, name: 'Cesar' },
      { id: 2, name: 'John' },
    ]

    render(<UserList users={users} />)
    const links = screen.getAllByRole('link')

    expect(links).toHaveLength(users.length)
    links.forEach((link, index) => {
      expect(link).toHaveTextContent(users[index].name)
      expect(link).toHaveAttribute('href', `/users/${users[index].id}`)
    })
  })

  it('should render fallback text when user list is empty', () => {
    const users: User[] = []

    render(<UserList users={users} />)

    expect(screen.getByText(/no users/i)).toBeInTheDocument()
  })
})
