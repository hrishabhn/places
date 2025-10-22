import {publicProcedure} from '../trpc'
import {type PlaceTag, PlaceTagSchema} from '../types'

import * as z from 'zod'

import {sql} from '@/model/neon'

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
