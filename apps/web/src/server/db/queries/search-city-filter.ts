import {type SearchInput, SearchResult} from '../types'

import * as z from 'zod'

import {sql} from '@/model/neon'

const types = ['country'] as const
const SearchResultSchema = SearchResult(types)
type SearchResult = z.infer<typeof SearchResultSchema>

export const SearchCityFilter = async ({query}: SearchInput): Promise<SearchResult[]> => {
    if (!query) return []

    // set limit for similarity
    await sql`select set_limit(0.3)`

    return z.array(SearchResultSchema).parse(
        await sql`
        select name, id, type, similarity(name, ${query}) as score
        from (
            select name, slug as id, 'country' as type from country
        )
        where name % ${query}
        order by score desc, lower(name)
        limit 10
        `
    )
}
