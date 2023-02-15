import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  password,
  timestamp,
} from '@keystone-6/core/fields';

export const User = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    // subjectId: text({ isIndexed: 'unique' }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),

    password: password({ validation: { isRequired: true } }),

    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),
  },
});
