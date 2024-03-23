import { http, HttpResponse } from 'msw'
import { products } from './data'

export const handlers = [
  http.get('/categories', () => {
    return HttpResponse.json([
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Books' },
      { id: 3, name: 'Home & Kitchen' },
    ])
  }),
  http.get('/products', () => {
    return HttpResponse.json(products)
  }),
  http.get('/products/:id', ({ params }) => {
    console.log('params:', params)
    const product = products.find((product) => product.id === Number(params.id))
    console.log('product:', product)
    if (!product) return HttpResponse.json(null)
    return HttpResponse.json(product)
  }),
]
