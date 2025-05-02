import {GetAllCity} from './procedures/get-all-city'
import {GetAllCountry} from './procedures/get-all-country'
import {GetAllPlace} from './procedures/get-all-place'
import {GetAllPlaceTag} from './procedures/get-all-place-tag'
import {GetAllPlaceType} from './procedures/get-all-place-type'
import {Search} from './procedures/search'
import {router} from './trpc'

export const appRouter = router({
    GetAllCountry,
    GetAllCity,

    GetAllPlaceType,
    GetAllPlaceTag,

    GetAllPlace,

    Search,
})

export type AppRouter = typeof appRouter
