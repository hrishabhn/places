import {publicProcedure} from '../trpc'
import {SearchInputSchema} from '../types'

import {z} from 'zod/v3'

import {sql} from '@/model/neon'

export const PlaceFilterSchema = z.object({
    name: z.string(),
    id: z.string(),
    type: z.enum(['country', 'city', 'place_type', 'place_tag']),
    score: z.coerce.number(),
})

type PlaceFilter = z.infer<typeof PlaceFilterSchema>

export const SearchPlaceFilter = publicProcedure.input(SearchInputSchema).query(async ({input: {query}}): Promise<PlaceFilter[]> => {
    if (!query) return []

    // set limit for similarity
    await sql`select set_limit(0.3)`

    return z.array(PlaceFilterSchema).parse(
        await sql`
        select name, id, type, similarity(name, ${query}) as score
        from (
            select name, slug as id, 'country' as type from country
            union
            select name, slug as id, 'city' as type from city
            union
            select name, name as id, 'place_type' as type from (select distinct unnest(type) as name from place)
            union
            select name, name as id, 'place_tag' as type from (select distinct unnest(tags) as name from place)
        )
        where name % ${query}
        order by score desc, lower(name)
        limit 10
        `
    )
})
