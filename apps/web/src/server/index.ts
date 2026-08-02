import {db} from '@repo/db'

import {publicProcedure, router} from './trpc'

export const appRouter = router({
    country: router({
        getAll: publicProcedure.input(db.country.getAll.input).query(async ({input}) => await db.country.getAll.query(input)),
    }),
    city: router({
        getAll: publicProcedure.input(db.city.getAll.input).query(async ({input}) => await db.city.getAll.query(input)),
        get: publicProcedure.input(db.city.get.input).query(async ({input}) => await db.city.get.query(input)),
    }),
    place: router({
        getAll: publicProcedure.input(db.place.getAll.input).query(async ({input}) => await db.place.getAll.query(input)),
        get: publicProcedure.input(db.place.get.input).query(async ({input}) => await db.place.get.query(input)),
    }),
    placeType: router({
        getAll: publicProcedure.query(async () => await db.placeType.getAll.query()),
    }),
    placeTag: router({
        getAll: publicProcedure.query(async () => await db.placeTag.getAll.query()),
    }),

    search: router({
        all: publicProcedure.input(db.search.all.input).query(async ({input}) => await db.search.all.query(input)),
        cityFilter: publicProcedure.input(db.search.cityFilter.input).query(async ({input}) => await db.search.cityFilter.query(input)),
        placeFilter: publicProcedure.input(db.search.placeFilter.input).query(async ({input}) => await db.search.placeFilter.query(input)),
    }),
})

export type AppRouter = typeof appRouter
