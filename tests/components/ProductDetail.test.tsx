import ProductDetail from '@/components/ProductDetail'
import { render, screen } from '@testing-library/react'
import { products } from '../mocks/data'

describe('ProductDetail', () => {
  it('should render product details', async () => {
    const productId = 1
    const product = products.find((product) => product.id === productId)!

    render(<ProductDetail productId={productId} />)
    const productName = await screen.findByText(RegExp(product.name, 'i'))
    const productPrice = await screen.findByText(RegExp(product.price.toString(), 'i'))

    expect(productName).toBeVisible()
    expect(productPrice).toBeVisible()
  })

  it('should render `not found` if no product found', async () => {
    const productId = products.length + 1

    render(<ProductDetail productId={productId} />)
    const message = await screen.findByText(/not found/i)

    expect(message).toBeVisible()
  })

  it('should render `invalid productId` if productId is invalid', async () => {
    render(<ProductDetail productId={0} />)
    const message = await screen.findByText(/invalid productId/i)

    expect(message).toBeVisible()
  })
})
