import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, relationship, image,integer } from '@keystone-6/core/fields';

export const Book = list({
  access: allowAll,
  fields: {
    title: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    year: text({
      validation: { isRequired: true },
    }),
    genre: text({
      validation: { isRequired: true },
    }),
    price: integer({defaultValue: 0, validation: { isRequired: true } }),
    avatar: image({ storage: 'my_local_images' }),
    author: relationship({ ref: 'Author.books' }),
    orderitem: relationship({ ref: 'OrderItem.product', many: true }),
    description: text({
      validation: { isRequired: true },
    }),
  },
});
