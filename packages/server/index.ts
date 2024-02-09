import express from "express";
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { tRPCRouter } from "./tRPC-router";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createContext = (args: trpcExpress.CreateExpressContextOptions) => ({});
// empty ctx for now

const app = express();

app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: tRPCRouter,
    createContext,
  }),
);




const port = 8080;
app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});