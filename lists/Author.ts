import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, relationship } from '@keystone-6/core/fields';

export const Author = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    age: text({
      validation: { isRequired: true },
    }),
    books: relationship({ ref: 'Book.author', many: true }),
  },
});
