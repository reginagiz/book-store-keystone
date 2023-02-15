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
      cors: { origin: ['http://localhost:3000'], credentials: true },
      port: 3000,
      maxFileSize: 200 * 1024 * 1024,
      healthCheck: true
    },
    lists,
    storage: {
      my_local_images: {
        kind: 'local',
        type: 'image',
        generateUrl: (path) => `http://localhost:3002/images${path}`,
        serverRoute: {
          path: '/images',
        },
        storagePath: 'public/images',
      },
    },
    session,
  })
);
