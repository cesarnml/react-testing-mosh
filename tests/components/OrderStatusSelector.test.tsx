import OrderStatusSelector from '@/components/OrderStatusSelector'
import { Theme } from '@radix-ui/themes'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('OrderStatusSelector', () => {
  const setup = () => {
    const onChange = vi.fn()
    const utils = render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>,
    )
    const user = userEvent.setup()
    const combobox = screen.getByRole('combobox')

    const findOptions = () => screen.getAllByRole('option')
    return {
      ...utils,
      user,
      combobox,
      onChange,
      findOptions,
    }
  }
  it('should render a combobox with a default value of `new`', () => {
    const defaultValue = 'new'

    const { combobox } = setup()

    expect(combobox).toHaveTextContent(RegExp(defaultValue, 'i'))
  })

  it('should render status options on combobox click', async () => {
    const optionValues = ['new', 'processed', 'fulfilled']

    const { user, combobox, findOptions } = setup()
    await user.click(combobox)

    const options = findOptions()

    options.forEach((option, index) => {
      expect(option).toHaveTextContent(RegExp(optionValues[index], 'i'))
    })
  })

  it('should call `onChange` when an option is selected and display `selectedOption`', async () => {
    const { user, findOptions, onChange, combobox } = setup()
    await user.click(combobox)
    const options = findOptions()

    options.forEach(async (option) => {
      await user.click(option)
      expect(onChange).toHaveBeenCalledWith(option.textContent?.toLowerCase())
      expect(combobox).toHaveTextContent(RegExp(option.textContent!, 'i'))
      await user.click(combobox)
    })
  })
})
