import {GetAllCityOptions, GetAllCountryOptions, GetAllPlaceOptions, GetCityOptions, GetPlaceOptions, db} from './db/client'
import {SearchInputSchema} from './db/types'
import {publicProcedure, router} from './trpc'

export const appRouter = router({
    country: router({
        getAll: publicProcedure.input(GetAllCountryOptions).query(async ({input}) => await db.country.getAll(input)),
    }),
    city: router({
        getAll: publicProcedure.input(GetAllCityOptions).query(async ({input}) => await db.city.getAll(input)),
        get: publicProcedure.input(GetCityOptions).query(async ({input}) => await db.city.get(input)),
    }),
    place: router({
        getAll: publicProcedure.input(GetAllPlaceOptions).query(async ({input}) => await db.place.getAll(input)),
        get: publicProcedure.input(GetPlaceOptions).query(async ({input}) => await db.place.get(input)),
    }),
    placeType: router({
        getAll: publicProcedure.query(async () => await db.placeType.getAll()),
    }),
    placeTag: router({
        getAll: publicProcedure.query(async () => await db.placeTag.getAll()),
    }),

    search: router({
        all: publicProcedure.input(SearchInputSchema).query(async ({input}) => await db.search.all(input)),
        cityFilter: publicProcedure.input(SearchInputSchema).query(async ({input}) => await db.search.cityFilter(input)),
        placeFilter: publicProcedure.input(SearchInputSchema).query(async ({input}) => await db.search.placeFilter(input)),
    }),
})

export type AppRouter = typeof appRouter
