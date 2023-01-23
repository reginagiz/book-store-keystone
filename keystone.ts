import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';
import type { ServerConfig } from '@keystone-6/core/types';


export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    server: {
      cors: { origin: ['http://localhost:3005'], credentials: true },
      port: 3000,
      maxFileSize: 200 * 1024 * 1024,
      healthCheck: true
    },
    lists,
    storage: {
      // The key here will be what is referenced in the image field
      my_local_images: {
        // Images that use this store will be stored on the local machine
        kind: 'local',
        // This store is used for the image field type
        type: 'image',
        // The URL that is returned in the Keystone GraphQL API
        generateUrl: (path) => `http://localhost:3000/images${path}`,
        // The route that will be created in Keystone's backend to serve the images
        serverRoute: {
          path: '/images',
        },
        storagePath: 'public/images',
      },
    },
    session,
  })
);
