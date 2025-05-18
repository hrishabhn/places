import {publicProcedure} from '../trpc'

import {z} from 'zod'

import {sql} from '@/model/neon'

const PlaceTypeSchema = z.object({
    type_name: z.string(),
    place_count: z.coerce.number(),
})

type PlaceType = z.infer<typeof PlaceTypeSchema>

export const GetAllPlaceType = publicProcedure.query(
    async (): Promise<PlaceType[]> =>
        z.array(PlaceTypeSchema).parse(
            await sql`
            SELECT UNNEST(type) as type_name, COUNT(*) as place_count
            FROM place
            GROUP BY type_name
            ORDER BY place_count DESC, lower(type_name)
            `
        )
)
