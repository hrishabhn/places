import {publicProcedure} from '../trpc'
import {type Country, CountrySchema} from '../types'

import {z} from 'zod'

import {sql} from '@/model/neon'

const GetAllCountryInputSchema = z.object({
    sort: z.enum(['name', 'city_count', 'place_count']),
})

export const GetAllCountry = publicProcedure.input(GetAllCountryInputSchema).query(async ({input: {sort}}): Promise<Country[]> => {
    const orderBy = {
        name: sql`name`,
        city_count: sql`city_count DESC, name`,
        place_count: sql`place_count DESC, name`,
    }[sort]

    return z.array(CountrySchema).parse(
        await sql`
            SELECT
                country.slug,
                country.name,
                country.flag,
                (SELECT COUNT(*) FROM city WHERE city.country_slug = country.slug) as city_count,
                (SELECT COUNT(*) FROM place JOIN city ON place.city_slug = city.slug WHERE city.country_slug = country.slug) as place_count
            FROM country
            ORDER BY ${orderBy}
            `
    )
})
