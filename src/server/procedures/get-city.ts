import {publicProcedure} from '../trpc'
import {type City, CitySchema} from '../types'

import {z} from 'zod/v3'

import {sql} from '@/model/neon'

export const GetCityOptions = z.object({
    slug: z.string(),
})

export const GetCity = publicProcedure.input(GetCityOptions).query(async ({input: {slug}}): Promise<City | null> => {
    const result = await sql`
        SELECT
            city.slug,
            city.name,
            city.country_slug,
            country.name as country_name,
            country.code as country_code,
            city.image,
            city.icon,
            (SELECT COUNT(*) FROM place WHERE place.city_slug = city.slug) as place_count
        FROM city
        JOIN country ON city.country_slug = country.slug
        WHERE city.slug = ${slug}
    `

    const item = result.at(0)
    if (item === undefined) return null

    return CitySchema.parse(item)
})
