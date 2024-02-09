import { TRPCError, initTRPC } from '@trpc/server';
 
interface Context {
  user?: {
    id: string;
    isAdmin: boolean;
  };
}
 
const t = initTRPC.context<Context>().create();
export const publicProcedure = t.procedure;
export const router = t.router;
 
export const adminProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;
  if (!ctx.user?.isAdmin) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: "You shall not pass"});
  }
  return opts.next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const adminRouter = router({
    someSecretPlace: adminProcedure.query(() => 'this will be unauthorized'),
});