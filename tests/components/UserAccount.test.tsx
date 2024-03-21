import UserAccount from '@/components/UserAccount'
import { render, screen } from '@testing-library/react'

describe('UserAccount', () => {
  it("should render the user's name if provided", () => {
    const user = { id: 1, name: 'Cesar' }

    render(<UserAccount user={user} />)

    expect(screen.getByText(RegExp(user.name, 'i'))).toBeInTheDocument()
  })

  it('should not render an edit button if the user is not an admin', () => {
    const user = { id: 1, name: 'Cesar' }

    render(<UserAccount user={user} />)

    expect(screen.queryByRole('button', { name: /edit/i })).not.toBeInTheDocument()
  })

  it('should render an edit button if the user is an admin', () => {
    const user = { id: 1, name: 'Cesar', isAdmin: true }

    render(<UserAccount user={user} />)

    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
  })
})
