import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { type TRPCRouter } from '../../server/tRPC-router';

export const trpc = createTRPCProxyClient<TRPCRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:8080/trpc',
        }),
    ],
});