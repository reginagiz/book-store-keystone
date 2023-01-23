import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, relationship, integer } from '@keystone-6/core/fields';

export const Order = list({
  access: allowAll,
  fields: {
    user: relationship({ ref: 'User.order' }),
    cart: relationship({ ref: 'OrderItem.order', many: true }),
  },
});