import {GetAllCity} from './procedures/get-all-city'
import {GetAllCountry} from './procedures/get-all-country'
import {GetAllPlace} from './procedures/get-all-place'
import {GetAllPlaceTag} from './procedures/get-all-place-tag'
import {GetAllPlaceType} from './procedures/get-all-place-type'
import {SearchCityFilter} from './procedures/search-city-filter'
import {SearchPlaceFilter} from './procedures/search-place-filter'
import {router} from './trpc'

export const appRouter = router({
    GetAllCountry,
    GetAllCity,

    GetAllPlaceType,
    GetAllPlaceTag,

    GetAllPlace,

    // search
    SearchCityFilter,
    SearchPlaceFilter,
})

export type AppRouter = typeof appRouter
