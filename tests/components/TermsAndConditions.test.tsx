import TermsAndConditions from '@/components/TermsAndConditions'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()
describe('TermsAndConditions', () => {
  beforeEach(() => {
    render(<TermsAndConditions />)
  })

  it('should render with correct text and initial state', () => {
    const heading = screen.getByRole('heading', { name: /terms & conditions/i })
    const checkbox = screen.getByRole('checkbox')
    const button = screen.getByRole('button', { name: /submit/i })

    expect(heading).toBeInTheDocument()
    expect(button).toBeDisabled()
    expect(checkbox).not.toBeChecked()
  })

  it('should enable submit button when terms are accepted', async () => {
    const checkbox = screen.getByRole('checkbox')
    const button = screen.getByRole('button', { name: /submit/i })
    await user.click(checkbox)

    expect(button).toBeEnabled()
    expect(checkbox).toBeChecked()
  })

  it('should disable submit button when terms are unaccepted', async () => {
    const checkbox = screen.getByRole('checkbox')
    const button = screen.getByRole('button', { name: /submit/i })
    await user.click(checkbox)
    await user.click(checkbox)

    expect(button).toBeDisabled()
    expect(checkbox).not.toBeChecked()
  })
})
