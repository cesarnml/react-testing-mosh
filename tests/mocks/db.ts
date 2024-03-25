import { factory, oneOf, primaryKey } from '@mswjs/data'
import { faker } from '@faker-js/faker'

export const db = factory({
  product: {
    id: primaryKey(() => faker.number.int()),
    name: () => faker.commerce.productName(),
    price: () => faker.number.int({ min: 1, max: 999 }),
    categoryId: oneOf('category'),
  },
  category: {
    id: primaryKey(() => faker.number.int()),
    name: () => faker.commerce.department(),
  },
})
