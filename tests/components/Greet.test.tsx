import Greet from '@/components/Greet'
import { render, screen } from '@testing-library/react'

describe('Greet', () => {
  it('should render a greeting with the provided name', () => {
    const name = 'Cesar'

    render(<Greet name={name} />)

    expect(screen.getByRole('heading')).toHaveTextContent(RegExp(name, 'i'))
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
  it('should render a login button when name is not provided', () => {
    render(<Greet />)

    expect(screen.getByRole('button')).toHaveTextContent(/login/i)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })
})
