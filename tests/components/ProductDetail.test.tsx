import ProductDetail from '@/components/ProductDetail'
import { render, screen } from '@testing-library/react'
import { db } from '../mocks/db'
import { server } from '../mocks/server'
import { http, HttpResponse } from 'msw'

describe('ProductDetail', () => {
  let productId: number

  beforeAll(() => {
    const product = db.product.create()
    productId = product.id
  })

  afterAll(() => {
    db.product.delete({ where: { id: { equals: productId } } })
  })

  it('should render product details', async () => {
    const product = db.product.findFirst({ where: { id: { equals: productId } } })!

    render(<ProductDetail productId={productId} />)
    const productName = await screen.findByText(RegExp(product.name, 'i'))
    const productPrice = await screen.findByText(RegExp(product.price.toString(), 'i'))

    expect(productName).toBeVisible()
    expect(productPrice).toBeVisible()
  })

  it('should render `not found` if no product found', async () => {
    server.use(
      http.get('/products/:id', () => {
        return HttpResponse.json(null)
      }),
    )

    const product = db.product.findFirst({ where: { id: { equals: productId } } })!
    const doesNotExistProductId = product.id + 1

    render(<ProductDetail productId={doesNotExistProductId} />)
    const message = await screen.findByText(/not found/i)

    expect(message).toBeVisible()
  })

  it('should render `invalid productId` if productId is invalid', async () => {
    render(<ProductDetail productId={0} />)
    const message = await screen.findByText(/invalid productId/i)

    expect(message).toBeVisible()
  })
})
