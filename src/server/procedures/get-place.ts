import {publicProcedure} from '../trpc'
import {type Place, PlaceSchema} from '../types'

import * as z from 'zod'

import {sql} from '@/model/neon'

export const GetPlaceOptions = z.object({
    id: z.uuid(),
})

export const GetPlace = publicProcedure.input(GetPlaceOptions).query(async ({input: {id}}): Promise<Place | null> => {
    const result = await sql`
        SELECT
            place.id,
            place.name,
            place.top,
            place.city_slug,
            city.name as city_name,
            city.country_slug,
            country.name as country_name,
            country.code as country_code,
            place.type,
            place.tags,
            place.image,
            place.description,
            place.maps_id,
            place.lat,
            place.lon
        FROM place
        JOIN city ON place.city_slug = city.slug
        JOIN country ON city.country_slug = country.slug
        WHERE place.id = ${id}
    `

    const item = result.at(0)
    if (item === undefined) return null

    return PlaceSchema.parse(item)
})
