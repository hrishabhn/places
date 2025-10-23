import {type City, CitySchema} from '../types'

import * as z from 'zod'

import {sql} from '@/model/neon'

export const GetCityOptions = z.object({
    slug: z.string(),
})

type GetCityOptions = z.infer<typeof GetCityOptions>

export const GetCity = async ({slug}: GetCityOptions): Promise<City | null> => {
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
}
