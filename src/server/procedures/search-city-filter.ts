import {publicProcedure} from '../trpc'
import {SearchInputSchema} from '../types'

import {z} from 'zod'

import {sql} from '@/model/neon'

const CityFilterSchema = z.object({
    name: z.string(),
    id: z.string(),
    type: z.enum(['country']),
    score: z.coerce.number(),
})

type CityFilter = z.infer<typeof CityFilterSchema>

export const SearchCityFilter = publicProcedure.input(SearchInputSchema).query(async ({input: {query}}): Promise<CityFilter[]> => {
    if (!query) return []

    // set limit for similarity
    await sql`select set_limit(0.3)`

    return z.array(CityFilterSchema).parse(
        await sql`
        select name, id, type, similarity(name, ${query}) as score
        from (
            select name, slug as id, 'country' as type from country
        )
        where name % ${query}
        order by score desc, name
        limit 10
        `
    )
})
