import ProductList from '@/components/ProductList'
import { render, screen } from '@testing-library/react'
import { products } from '../mocks/data'
import { server } from '../mocks/server'
import { http, HttpResponse } from 'msw'

describe('ProductList', () => {
  it('should render the list of products', async () => {
    render(<ProductList />)
    const items = await screen.findAllByRole('listitem')

    expect(items).toHaveLength(products.length)
    items.forEach((item, index) => {
      expect(item).toHaveTextContent(RegExp(products[index].name, 'i'))
    })
  })

  it('should render `no products` if no products are found', async () => {
    server.use(http.get('/products', () => HttpResponse.json([])))
    render(<ProductList />)
    const message = await screen.findByText(/no products/i)
    expect(message).toBeVisible()
  })
})
