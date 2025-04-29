import {publicProcedure} from '../trpc'

import {z} from 'zod'

import {sql} from '@/model/neon'

const GetAllPlaceTypeResponseSchema = z.array(z.object({place_type: z.string()}).transform(({place_type}) => place_type))

export const GetAllPlaceType = publicProcedure.query(
    async (): Promise<string[]> => GetAllPlaceTypeResponseSchema.parse(await sql`SELECT DISTINCT UNNEST(type) as place_type FROM place ORDER BY place_type`)
)
