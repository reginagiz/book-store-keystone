import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
    text,
    relationship,
    password,
    timestamp,
} from '@keystone-6/core/fields';

export const Customer = list({
    access: allowAll,
    fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({
            validation: { isRequired: true },
            isIndexed: 'unique',
        }),
        orderitems: relationship({ ref: 'OrderItem.customer', many: true }),

        createdAt: timestamp({
            defaultValue: { kind: 'now' },
        }),
    },
});
