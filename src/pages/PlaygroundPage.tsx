import OrderStatusSelector from '@/components/OrderStatusSelector'
import { Theme } from '@radix-ui/themes'

const PlaygroundPage = () => {
  const onChange = () => {}

  return (
    <>
      <Theme>
        <OrderStatusSelector onChange={console.log} />
      </Theme>
      ,
    </>
  )
}

export default PlaygroundPage
