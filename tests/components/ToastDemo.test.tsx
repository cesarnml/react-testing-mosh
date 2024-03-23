import ToastDemo from '@/components/ToastDemo'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toaster } from 'react-hot-toast'

describe('ToastDemo', () => {
  const setup = () => {
    const utils = render(
      <>
        <ToastDemo />
        <Toaster />
      </>,
    )
    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: /show/i })
    const findToast = (message: string) => screen.findByText(RegExp(message, 'i'))

    return {
      ...utils,
      user,
      button,
      findToast,
    }
  }

  it('should render a toast when button is clicked', async () => {
    const message = 'success'

    const { user, button, findToast } = setup()

    await user.click(button)
    const toast = await findToast(message)

    expect(toast).toHaveTextContent(RegExp(message, 'i'))
  })
})
