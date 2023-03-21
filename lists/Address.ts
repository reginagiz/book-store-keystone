import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, integer, text } from '@keystone-6/core/fields';

export const Address = list({
    access: allowAll,
    fields: {
        country: text({ validation: { isRequired: true } }),
        city: text({ validation: { isRequired: true } }),
        street: text({ validation: { isRequired: true } }),
        build: text({ validation: { isRequired: true } }),
        index: text({ validation: { isRequired: true } }),
        customer: relationship({ ref: 'Customer.address' }),
        order: relationship({ ref: 'Order.address' }),
    },
});