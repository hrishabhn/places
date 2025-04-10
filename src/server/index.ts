import {publicProcedure, router} from './trpc'

import {z} from 'zod'

import {NotionClient} from '@/model/client'

export const appRouter = router({
    getAllPlace: publicProcedure.query(async () => await NotionClient.getAllPlace()),
    getAllDropdown: publicProcedure.query(async () => await NotionClient.getAllDropdown()),
    getCityImage: publicProcedure.input(z.string()).query(async ({input: name}) => await NotionClient.getCityImage(name)),
})

export type AppRouter = typeof appRouter
