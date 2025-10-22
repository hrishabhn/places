import {publicProcedure} from '../trpc'
import {type PlaceType, PlaceTypeSchema} from '../types'

import {z} from 'zod/v4'

import {sql} from '@/model/neon'

export const GetAllPlaceType = publicProcedure.query(
    async (): Promise<PlaceType[]> =>
        z.array(PlaceTypeSchema).parse(
            await sql`
            SELECT UNNEST(type) as type_name, COUNT(*) as place_count
            FROM place
            GROUP BY type_name
            ORDER BY place_count DESC, LOWER(UNNEST(type))
            `
        )
)
