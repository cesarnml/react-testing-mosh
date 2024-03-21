import UserAccount from '@/components/UserAccount'
import { render, screen } from '@testing-library/react'

describe('UserAccount', () => {
  it('should render user name', () => {
    const user = { id: 1, name: 'Cesar' }

    render(<UserAccount user={user} />)

    expect(screen.getByText(RegExp(user.name, 'i'))).toBeInTheDocument()
  })

  it('should not render edit button if user is not admin', () => {
    const user = { id: 1, name: 'Cesar' }

    render(<UserAccount user={user} />)

    expect(screen.queryByRole('button', { name: /edit/i })).not.toBeInTheDocument()
  })

  it('should render edit button if user is admin', () => {
    const user = { id: 1, name: 'Cesar', isAdmin: true }

    render(<UserAccount user={user} />)

    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
  })
})
