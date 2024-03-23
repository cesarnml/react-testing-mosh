import { Category } from '@/entities'

describe('group', () => {
  it('should', async () => {
    const response = await fetch('/categories')
    const data = (await response.json()) as Category[]
    console.log('data:', data)
    expect(data).toHaveLength(3)
  })
})
