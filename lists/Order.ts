import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, relationship, integer } from '@keystone-6/core/fields';

export const Order = list({
  access: allowAll,
  fields: {
    cart: relationship({ ref: 'OrderItem.order', many: true }),
    customer: relationship({ ref: 'Customer.orders', many: true }),
    totalprice: integer({ defaultValue: 0, validation: { isRequired: true } })
  },
});