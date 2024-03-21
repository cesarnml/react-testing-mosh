import SearchBox from '@/components/SearchBox'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import exp from 'constants'

const user = userEvent.setup()

describe('SearchBox', () => {
  it('should render an empty search input with placeholder text', () => {
    const placeholder = 'Search...'
    const onChange = vi.fn()

    render(<SearchBox onChange={onChange} />)
    const input = screen.getByRole('textbox')

    expect(input).toHaveDisplayValue('')
    expect(input).toHaveAttribute('placeholder', placeholder)
  })

  it('should call onChange on "Enter" if input has non-empty value', async () => {
    const onChange = vi.fn()

    render(<SearchBox onChange={onChange} />)
    const text = 'Hello, World!'
    const input = screen.getByRole('textbox')

    await user.type(input, text)

    expect(input).toHaveDisplayValue(text)
    expect(onChange).not.toHaveBeenCalled()

    await user.keyboard('{enter}')

    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith(text)
  })

  it('should not call onChange on "Enter" if input has empty value', async () => {
    const onChange = vi.fn()

    render(<SearchBox onChange={onChange} />)

    expect(onChange).not.toHaveBeenCalled()
    await user.keyboard('{enter}')
    expect(onChange).not.toHaveBeenCalled()
  })
})
