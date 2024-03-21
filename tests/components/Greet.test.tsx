import Greet from '@/components/Greet'
import { render, screen } from '@testing-library/react'

describe('Greet', () => {
  it('should render a name prop', () => {
    const name = 'John'
    render(<Greet name={name} />)
    expect(screen.getByText(RegExp(name, 'i'))).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.getByRole('heading')).toHaveTextContent(RegExp(name, 'i'))
  })
})
