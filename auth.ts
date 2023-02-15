import { randomBytes } from 'crypto';
import { createAuth } from '@keystone-6/auth';
// import { createAuth } from '@opensaas/keystone-nextjs-auth';
// import Auth0 from '@opensaas/keystone-nextjs-auth/providers/auth0';

import { statelessSessions } from '@keystone-6/core/session';


let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== 'production') {
  sessionSecret = randomBytes(32).toString('hex');
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name createdAt',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
});

// let sessionSecret = process.env.SESSION_SECRET;

// if (!sessionSecret) {
//   if (process.env.NODE_ENV === 'production') {
//     throw new Error(
//       'The SESSION_SECRET environment variable must be set in production'
//     );
//   } else {
//     sessionSecret = '-- DEV COOKIE SECRET; CHANGE ME --';
//   }
// }
// const { withAuth } = createAuth({
//   listKey: 'User',
//   identityField: 'subjectId',
//   sessionData: `id name email`,
//   autoCreate: true,
//   resolver: async ({ user, profile, account }) => {
//     const username = user.name as string;
//     const email = user.email as string;
//     return { email, username };
//   },
//   keystonePath: '/admin',
//   sessionSecret,
//   providers: [
//     Auth0({
//       clientId: process.env.AUTH0_CLIENT_ID || 'Auth0ClientID',
//       clientSecret: process.env.AUTH0_CLIENT_SECRET || 'Auth0ClientSecret',
//       issuer: process.env.AUTH0_ISSUER_BASE_URL || 'https://opensaas.au.auth0.com',
//     }),
//   ]
// });

const sessionMaxAge = 60 * 60 * 24 * 30;

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret!,
});

export { withAuth, session };
