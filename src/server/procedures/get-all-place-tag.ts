import {publicProcedure} from '../trpc'

import {z} from 'zod'

import {sql} from '@/model/neon'

const PlaceTagSchema = z.object({
    tag_name: z.string(),
    place_count: z.coerce.number(),
})

type PlaceTag = z.infer<typeof PlaceTagSchema>

export const GetAllPlaceTag = publicProcedure.query(
    async (): Promise<PlaceTag[]> =>
        z.array(PlaceTagSchema).parse(
            await sql`
            SELECT UNNEST(tags) AS tag_name, COUNT(*) AS place_count
            FROM place
            GROUP BY tag_name
            ORDER BY place_count DESC, LOWER(UNNEST(tags))
            `
        )
)
