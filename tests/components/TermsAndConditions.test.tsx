import TermsAndConditions from '@/components/TermsAndConditions'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('TermsAndConditions', () => {
  const setup = () => {
    const user = userEvent.setup()

    render(<TermsAndConditions />)

    return {
      user,
      heading: screen.getByRole('heading', { name: /terms & conditions/i }),
      checkbox: screen.getByRole('checkbox'),
      button: screen.getByRole('button', { name: /submit/i }),
    }
  }

  it('should render with correct text and initial state', () => {
    const { heading, button, checkbox } = setup()

    expect(heading).toBeInTheDocument()
    expect(button).toBeDisabled()
    expect(checkbox).not.toBeChecked()
  })

  it('should enable submit button when terms are accepted', async () => {
    const { user, button, checkbox } = setup()

    await user.click(checkbox)

    expect(button).toBeEnabled()
    expect(checkbox).toBeChecked()
  })

  it('should disable submit button when terms are unaccepted', async () => {
    const { user, button, checkbox } = setup()

    await user.click(checkbox)
    await user.click(checkbox)

    expect(button).toBeDisabled()
    expect(checkbox).not.toBeChecked()
  })
})
