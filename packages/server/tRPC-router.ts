import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import fs from 'fs/promises';
import { adminRouter } from './tRPC-admin-router';

export type Resource = { id: number, value: string }

type DBData = {
    resources: Resource[]
}

const getDbData = async () => {
    const resources = await fs.readFile('./db.json')    
    return JSON.parse(resources.toString()) as DBData
}


export const t = initTRPC.context().create();

const publicRouter = t.router({
    hello: t.procedure.query(() => {
        return 'Hello, World!' as const
    }),

    getResourceById: t.procedure
    .input(z.number())
    .query(async (opts) => {
        try {
            const { resources } = await getDbData()
            return resources.filter(r => r.id === opts.input)[0]
        } catch (error) {
            console.log(error);
        }
    }),
    getAllResources: t.procedure.query(async () => {
        try {
            const { resources } = await getDbData()
            return resources
        } catch (error) {
            console.log(error);
        }
    }),

    createResource: t.procedure
    .input(z.string().min(4))
    .mutation(async (opts) => {
        try {
            const { resources } = await getDbData()
            const newResource = { id: resources.length + 1, value: opts.input }
            resources.push(newResource)
            await fs.writeFile('./db.json', JSON.stringify({ resources }))
            return newResource
        } catch (error) {
            console.log(error);
        }
    })
})

export const tRPCRouter = t.router({
    public: publicRouter,
    admin: adminRouter
})

export type TRPCRouter = typeof tRPCRouter;