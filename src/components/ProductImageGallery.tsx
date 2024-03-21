type Props = {
  imageUrls: string[]
}

const ProductImageGallery = ({ imageUrls }: Props) => {
  if (imageUrls.length === 0) return null

  return (
    <ul>
      {imageUrls.map((url) => (
        <li key={url}>
          <img src={url} alt="product" />
        </li>
      ))}
    </ul>
  )
}

export default ProductImageGallery
