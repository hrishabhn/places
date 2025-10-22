import {publicProcedure} from '../trpc'
import {type Country, CountrySchema} from '../types'

import {z} from 'zod/v4'

import {sql} from '@/model/neon'

export const GetAllCountryOptions = z.object({
    sort: z.enum(['name', 'city_count', 'place_count']),
    limit: z.number().optional(),
})

export const GetAllCountry = publicProcedure.input(GetAllCountryOptions).query(async ({input: {sort, limit}}): Promise<Country[]> => {
    const orderBy = {
        name: sql`lower(country.name)`,
        city_count: sql`city_count DESC, lower(country.name)`,
        place_count: sql`place_count DESC, lower(country.name)`,
    }[sort]

    return z.array(CountrySchema).parse(
        await sql`
            SELECT
                country.slug,
                country.name,
                country.code,
                (SELECT COUNT(*) FROM city WHERE city.country_slug = country.slug) as city_count,
                (SELECT COUNT(*) FROM place JOIN city ON place.city_slug = city.slug WHERE city.country_slug = country.slug) as place_count
            FROM country
            ORDER BY ${orderBy}
            ${limit ? sql`LIMIT ${limit}` : sql``}
            `
    )
})
