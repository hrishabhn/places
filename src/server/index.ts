import {publicProcedure, router} from './trpc'

import {z} from 'zod'

import {getCityImage} from '@/model/client'

export const appRouter = router({
    getCityImage: publicProcedure.input(z.string()).query(async ({input: name}) => await getCityImage(name)),
})

export type AppRouter = typeof appRouter
