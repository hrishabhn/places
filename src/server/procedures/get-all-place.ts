import {publicProcedure} from '../trpc'
import {type Place, PlaceSchema} from '../types'

import {z} from 'zod'

import {sql} from '@/model/neon'

const GetAllPlaceOptionsSchema = z.object({
    filter: z
        .object({
            top: z.boolean().default(false),
            countrySlug: z.array(z.string()).default([]),
            citySlug: z.array(z.string()).default([]),
            placeType: z.array(z.string()).default([]),
            placeTag: z.array(z.string()).default([]),
        })
        .default({}),
    limit: z.number().optional(),
})

export type GetAllPlaceOptions = z.input<typeof GetAllPlaceOptionsSchema>

export const GetAllPlace = publicProcedure.input(GetAllPlaceOptionsSchema).query(
    async ({
        input: {
            filter: {top, countrySlug, citySlug, placeType, placeTag},
            limit,
        },
    }): Promise<Place[]> =>
        z.array(PlaceSchema).parse(
            await sql`
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
                place.lon,
                place.created,
                place.modified
            FROM place
            JOIN city ON place.city_slug = city.slug
            JOIN country ON city.country_slug = country.slug
            WHERE
                ${top ? sql`place.top = TRUE AND` : sql``}
                ${countrySlug.length > 0 ? sql`city.country_slug IN ('${sql.unsafe(countrySlug.join("', '"))}') AND` : sql``}
                ${citySlug.length > 0 ? sql`place.city_slug IN ('${sql.unsafe(citySlug.join("', '"))}') AND` : sql``}
                ${placeType.length > 0 ? sql`place.type && ARRAY['${sql.unsafe(placeType.join("', '"))}'] AND` : sql``}
                ${placeTag.length > 0 ? sql`place.tags && ARRAY['${sql.unsafe(placeTag.join("', '"))}'] AND` : sql``}
                TRUE
            ORDER BY place.name
            ${limit ? sql`LIMIT ${limit}` : sql``}
            `
        )
)
