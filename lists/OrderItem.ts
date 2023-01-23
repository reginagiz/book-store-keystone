import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, integer } from '@keystone-6/core/fields';

export const OrderItem = list({
  access: allowAll,
  fields: {
    quantity: integer({defaultValue: 0, validation: { isRequired: true } }),
    product: relationship({ ref: 'Book.orderitem' }),
    order: relationship({ ref: 'Order.cart' }),
  },
});
