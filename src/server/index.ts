import {GetAllCity} from './procedures/get-all-city'
import {GetAllCountry} from './procedures/get-all-country'
import {GetAllPlace} from './procedures/get-all-place'
import {GetAllPlaceTag} from './procedures/get-all-place-tag'
import {GetAllPlaceType} from './procedures/get-all-place-type'
import {publicProcedure, router} from './trpc'

import {z} from 'zod'

import {NotionClient} from '@/model/client'

export const appRouter = router({
    GetAllCountry,
    GetAllCity,

    GetAllPlaceType,
    GetAllPlaceTag,

    GetAllPlace,

    getCityImage: publicProcedure.input(z.string()).query(async ({input: name}) => await NotionClient.getCityImage(name)),
})

export type AppRouter = typeof appRouter
