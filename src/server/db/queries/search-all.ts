import {type SearchInput, SearchResult} from '../types'

import * as z from 'zod'

import {sql} from '@/model/neon'

const types = ['country', 'city', 'place', 'place_type', 'place_tag'] as const
const SearchResultSchema = SearchResult(types)
type SearchResult = z.infer<typeof SearchResultSchema>

export const SearchAll = async ({query}: SearchInput): Promise<SearchResult[]> => {
    if (!query) return []

    // set limit for similarity
    await sql`select set_limit(0.3)`

    return z.array(SearchResultSchema).parse(
        await sql`
        select name, id, type, similarity(name, ${query}) as score
        from (
            select name, slug as id, 'country' as type from country
            union
            select name, slug as id, 'city' as type from city
            union
            select name, id::text as id, 'place' as type from place
            union
            select name, name as id, 'place_type' as type from (select distinct unnest(type) as name from place)
            union
            select name, name as id, 'place_tag' as type from (select distinct unnest(tags) as name from place)
        )
        where name % ${query}
        order by score desc, lower(name)
        limit 20
        `
    )
}
