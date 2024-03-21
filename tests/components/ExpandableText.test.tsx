import ExpandableText from '@/components/ExpandableText'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()
const longTextRepeatTimes = 100

describe('ExpandableText', () => {
  it('should fully render short text and not render expand text button', () => {
    const text = 'Hello, World!'

    render(<ExpandableText text={text} />)
    const button = screen.queryByRole('button')

    expect(screen.getByText(text)).toBeVisible()
    expect(button).not.toBeInTheDocument()
  })

  it('should truncate long text and display a button to expand', () => {
    const baseText = 'Hello, World!'
    const longText = baseText.repeat(longTextRepeatTimes)
    const truncatedTextIdentifier = '...'

    render(<ExpandableText text={longText} />)
    const article = screen.getByRole('article')
    const button = screen.getByRole('button', { name: /more/i })

    expect(article).toHaveTextContent(RegExp(truncatedTextIdentifier, 'i'))
    expect(button).toHaveTextContent(/more/i)
  })

  it('should display full text and "show less" button after "show more" button is clicked', async () => {
    const baseText = 'Hello, World!'
    const longText = baseText.repeat(longTextRepeatTimes)

    render(<ExpandableText text={longText} />)
    const article = screen.getByRole('article')
    const button = screen.getByRole('button', { name: /more/i })
    await user.click(button)

    expect(article).toHaveTextContent(longText)
    expect(button).toHaveTextContent(/less/i)
  })

  it('should display truncated text and "show more" button after "show less" button is clicked', async () => {
    const baseText = 'Hello, World!'
    const longText = baseText.repeat(longTextRepeatTimes)
    const truncatedTextIdentifier = '...'

    render(<ExpandableText text={longText} />)
    const article = screen.getByRole('article')
    const button = screen.getByRole('button', { name: /more/i })
    await user.click(button)
    await user.click(button)

    expect(article).toHaveTextContent(RegExp(truncatedTextIdentifier, 'i'))
    expect(button).toHaveTextContent(/more/i)
  })
})
