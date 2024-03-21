import ProductImageGallery from '@/components/ProductImageGallery'
import { render, screen } from '@testing-library/react'

describe('ProductImageGallery', () => {
  it('should render a list of product images', () => {
    const imageUrls = ['url1', 'url2']

    render(<ProductImageGallery imageUrls={imageUrls} />)
    const images = screen.getAllByRole('img')

    expect(images).toHaveLength(imageUrls.length)
    images.forEach((image, index) => {
      expect(image).toHaveAttribute('src', imageUrls[index])
      expect(image).toHaveAttribute('alt')
    })
  })

  it('should render nothing if image url list is empty', () => {
    const imageUrls: string[] = []

    const { container } = render(<ProductImageGallery imageUrls={imageUrls} />)

    expect(container).toBeEmptyDOMElement()
  })
})
