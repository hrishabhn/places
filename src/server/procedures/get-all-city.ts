import {publicProcedure} from '../trpc'
import {type City, CitySchema} from '../types'

import {z} from 'zod'

import {sql} from '@/model/neon'

const GetAllCityOptionsSchema = z.object({
    filter: z
        .object({
            countrySlug: z.array(z.string()).default([]),
        })
        .default({}),
    sort: z.enum(['place_count', 'country', 'name']),
    limit: z.number().optional(),
})

export type GetAllCityOptions = z.input<typeof GetAllCityOptionsSchema>

export const GetAllCity = publicProcedure.input(GetAllCityOptionsSchema).query(
    async ({
        input: {
            filter: {countrySlug},
            sort,
            limit,
        },
    }): Promise<City[]> => {
        const orderBy = {
            place_count: sql`place_count DESC, city.name`,
            country: sql`country.name, city.name`,
            name: sql`city.name`,
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
            ${limit ? sql`LIMIT ${limit}` : sql``}
            `
        )
    }
)
