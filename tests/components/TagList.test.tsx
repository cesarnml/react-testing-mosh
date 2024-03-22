import TagList from '@/components/TagList'
import { render, screen } from '@testing-library/react'

describe('TagList', () => {
  it('should render tags', async () => {
    const tagsLength = 3

    render(<TagList />)
    const tags = await screen.findAllByRole('listitem')

    expect(tags).toHaveLength(tagsLength)
  })
})
