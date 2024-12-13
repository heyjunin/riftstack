import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../server/src';

export const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});
