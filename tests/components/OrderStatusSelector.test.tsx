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

    const findOptions = () => screen.findAllByRole('option')
    const findOption = (label: string) => screen.findByRole('option', { name: RegExp(label, 'i') })
    return {
      ...utils,
      user,
      combobox,
      onChange,
      findOptions,
      findOption,
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

    const options = await findOptions()

    options.forEach((option, index) => {
      expect(option).toHaveTextContent(RegExp(optionValues[index], 'i'))
    })
  })

  it('should call `onChange` when option is selected and display `selectedOption`', async () => {
    // Note: the order that  options are selected matters, since default value is `new`
    const optionValues = ['processed', 'fulfilled', 'new']

    const { user, onChange, combobox, findOption } = setup()

    for (const [index, value] of optionValues.entries()) {
      await user.click(combobox)
      const selectedOption = await findOption(value)
      await user.click(selectedOption)

      expect(onChange).toHaveBeenCalledTimes(index + 1)
      expect(onChange).toHaveBeenCalledWith(value)
      expect(combobox).toHaveTextContent(RegExp(value, 'i'))
    }
  })
})
