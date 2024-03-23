import ProductDetail from '@/components/ProductDetail'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { db } from '../mocks/db'
import { server } from '../mocks/server'
import { http, HttpResponse, delay } from 'msw'

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

  it('should render an error message when there is an error', async () => {
    server.use(
      http.get('/products/:id', () => {
        return HttpResponse.error()
      }),
    )

    render(<ProductDetail productId={productId} />)
    const message = await screen.findByText(/error/i)
    expect(message).toBeVisible()
  })

  it('should render the loading indicator when fetching data', async () => {
    server.use(
      http.get('/products/:id', async () => {
        await delay()
        return HttpResponse.json({})
      }),
    )

    render(<ProductDetail productId={productId} />)
    const loading = await screen.findByText(/loading/i)

    expect(loading).toBeVisible()
  })

  it('should remove the loading indicator when data is fetched', async () => {
    render(<ProductDetail productId={productId} />)

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  })

  it('should remove the loading indicator when an error occurred', async () => {
    server.use(http.get('/products', () => HttpResponse.error()))

    render(<ProductDetail productId={productId} />)
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  })
})
