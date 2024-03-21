import SearchBox from '@/components/SearchBox'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('SearchBox', () => {
  const setup = () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(<SearchBox onChange={onChange} />)
    const input = screen.getByRole('textbox')

    return {
      user,
      onChange,
      input,
    }
  }
  it('should render an empty search input with placeholder text', () => {
    const placeholder = 'Search...'

    const { input } = setup()

    expect(input).toHaveDisplayValue('')
    expect(input).toHaveAttribute('placeholder', placeholder)
  })

  it('should call onChange on "Enter" if input has non-empty value', async () => {
    const text = 'Hello, World!'
    const { input, user, onChange } = setup()

    await user.type(input, text)

    expect(input).toHaveDisplayValue(text)
    expect(onChange).not.toHaveBeenCalled()

    await user.type(input, '{enter}')

    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith(text)
  })

  it('should not call onChange on "Enter" if input has empty value', async () => {
    const { user, onChange } = setup()

    expect(onChange).not.toHaveBeenCalled()
    await user.keyboard('{enter}')
    expect(onChange).not.toHaveBeenCalled()
  })
})
