import ProductList from '@/components/ProductList'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { delay, http, HttpResponse } from 'msw'
import { AllProviders } from '../AllProviders'
import { db } from '../mocks/db'
import { server } from '../mocks/server'

describe('ProductList', () => {
  const productIds: number[] = []

  beforeAll(() => {
    new Array(3).fill(null).forEach(() => {
      const product = db.product.create()
      productIds.push(product.id)
    })
  })

  afterAll(() => {
    db.product.deleteMany({ where: { id: { in: productIds } } })
  })

  it.skip('should render the list of products', async () => {
    render(<ProductList />, { wrapper: AllProviders })
    const items = await screen.findAllByRole('listitem')
    const products = db.product.getAll()

    expect(items).toHaveLength(db.product.getAll().length)
    items.forEach((item, index) => {
      expect(item).toHaveTextContent(RegExp(products[index].name, 'i'))
    })
  })

  it('should render `no products` if no products are found', async () => {
    server.use(http.get('/products', () => HttpResponse.json([])))
    render(<ProductList />, { wrapper: AllProviders })
    const message = await screen.findByText(/no products/i)
    expect(message).toBeVisible()
  })

  it('should render an error message when there is an error', async () => {
    server.use(http.get('/products', () => HttpResponse.error()))

    render(<ProductList />, { wrapper: AllProviders })
    const message = await screen.findByText(/error/i)

    expect(message).toBeVisible()
  })

  it('should render the loading indicator when fetching data', async () => {
    server.use(
      http.get('/products', async () => {
        await delay()
        return HttpResponse.json([])
      }),
    )

    render(<ProductList />, { wrapper: AllProviders })
    const loading = await screen.findByText(/loading/i)

    expect(loading).toBeVisible()
  })

  it('should remove the loading indicator when data is fetched', async () => {
    render(<ProductList />, { wrapper: AllProviders })
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  })

  it('should remove the loading indicator when an error occurred', async () => {
    server.use(http.get('/products', () => HttpResponse.error()))

    render(<ProductList />, { wrapper: AllProviders })
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  })
})
