import {publicProcedure} from '../trpc'

import {z} from 'zod'

import {sql} from '@/model/neon'

const GetAllPlaceTagResponseSchema = z.array(z.object({place_tag: z.string()}).transform(({place_tag}) => place_tag))

export const GetAllPlaceTag = publicProcedure.query(
    async (): Promise<string[]> => GetAllPlaceTagResponseSchema.parse(await sql`SELECT DISTINCT UNNEST(tags) as place_tag FROM place ORDER BY place_tag`)
)
