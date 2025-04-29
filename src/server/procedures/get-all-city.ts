import {publicProcedure} from '../trpc'
import {type City, CitySchema} from '../types'

import {z} from 'zod'

import {sql} from '@/model/neon'

const GetAllCityInputSchema = z.object({
    sort: z.enum(['name', 'place_count']),
    filter: z
        .object({
            countrySlug: z.array(z.string()).default([]),
        })
        .default({}),
})

export const GetAllCity = publicProcedure.input(GetAllCityInputSchema).query(
    async ({
        input: {
            sort,
            filter: {countrySlug},
        },
    }): Promise<City[]> => {
        const orderBy = {
            name: sql`city.name`,
            place_count: sql`place_count DESC, city.name`,
        }[sort]

        return z.array(CitySchema).parse(
            await sql`
            SELECT
                city.slug,
                city.name,
                city.country_slug,
                country.name as country_name,
                country.code as country_code,
                city.image,
                (SELECT COUNT(*) FROM place WHERE place.city_slug = city.slug) as place_count
            FROM city
            JOIN country ON city.country_slug = country.slug
            ${countrySlug.length > 0 ? sql`WHERE city.country_slug IN ('${sql.unsafe(countrySlug.join("', '"))}')` : sql``}
            GROUP BY city.slug, country_name, country_code
            ORDER BY ${orderBy}
            `
        )
    }
)
