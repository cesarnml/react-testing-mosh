import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

type Props = {
  children: ReactNode
}

export const AllProviders = ({ children }: Props) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
