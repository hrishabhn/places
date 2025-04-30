import {publicProcedure} from '../trpc'
import {type SearchResult, SearchResultSchema} from '../types'

import {z} from 'zod'

import {sql} from '@/model/neon'

const SearchInputSchema = z.object({
    query: z.string(),
})

export const Search = publicProcedure.input(SearchInputSchema).query(async ({input: {query}}): Promise<SearchResult[]> => {
    if (!query) return []
    await sql`select set_limit(0.1)`

    return z.array(SearchResultSchema).parse(
        await sql`
        select name, id, type, similarity(name, ${query}) as score
        from (
            select name, cast(id as text) as id, 'place' as type from place
            union
            select name, slug as id, 'country' as type from country
            union
            select name, slug as id, 'city' as type from city
            union
            select name, name as id, 'place_type' as type from (select distinct unnest(type) as name from place)
            union
            select name, name as id, 'place_tag' as type from (select distinct unnest(tags) as name from place)
        )
        where name % ${query}
        order by score desc
        limit 20
        `
    )
})
