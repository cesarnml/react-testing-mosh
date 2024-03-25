import BrowseProducts from '@/pages/BrowseProductsPage'
import { Theme } from '@radix-ui/themes'
import { render, screen } from '@testing-library/react'
import { server } from '../mocks/server'
import { delay, http, HttpResponse } from 'msw'

describe('BrowseProducts', () => {
  it('should render the category loading indicator while fetching data', () => {
    server.use(
      http.get('/categories', async () => {
        await delay()
        return HttpResponse.json([])
      }),
    )
    render(
      <Theme>
        <BrowseProducts />
      </Theme>,
    )
    const categoryLoadingIndicator = screen.getBy
  })
})
