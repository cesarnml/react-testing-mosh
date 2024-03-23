import OrderStatusSelector from '@/components/OrderStatusSelector'
import { Theme } from '@radix-ui/themes'

const PlaygroundPage = () => {
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
