import {publicProcedure} from '../trpc'
import {type Place, PlaceSchema} from '../types'

import {z} from 'zod'

import {sql} from '@/model/neon'

const GetAllPlaceOptionsSchema = z.object({
    filter: z
        .object({
            id: z.array(z.string().uuid()).default([]),
            top: z.boolean().default(false),
            countrySlug: z.array(z.string()).default([]),
            citySlug: z.array(z.string()).default([]),
            placeType: z.array(z.string()).default([]),
            placeTag: z.array(z.string()).default([]),
        })
        .default({}),
    query: z.string().default(''),
    sort: z.enum(['name', 'country', 'city', 'created', 'modified', 'random']),
    limit: z.number().optional(),
    offset: z.number().default(0),
})

export type GetAllPlaceOptions = z.input<typeof GetAllPlaceOptionsSchema>

export const GetAllPlace = publicProcedure.input(GetAllPlaceOptionsSchema).query(
    async ({
        input: {
            filter: {id, top, countrySlug, citySlug, placeType, placeTag},
            query,
            sort,
            limit,
            offset,
        },
    }): Promise<Place[]> => {
        // set limit for similarity
        await sql`select set_limit(0.3)`

        // order by
        const orderBy = {
            name: sql`place.name`,
            country: sql`country.name, place.name`,
            city: sql`city.name, country.name, place.name`,
            created: sql`place.created DESC`,
            modified: sql`place.modified DESC`,
            random: sql`random()`,
        }[sort]

        return z.array(PlaceSchema).parse(
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
                ${
                    query
                        ? sql`,
                        GREATEST(
                            similarity(place.name, ${query})
                            ,
                            similarity(city.name, ${query}) * 0.9
                            ,
                            similarity(country.name, ${query}) * 0.9
                            ,
                            (SELECT MAX(similarity(type, ${query}) * 0.8) FROM unnest(place.type) as type)
                            ,
                            (SELECT MAX(similarity(tag, ${query}) * 0.8) FROM unnest(place.tags) as tag)
                        ) as score`
                        : sql``
                }
            FROM place
            JOIN city ON place.city_slug = city.slug
            JOIN country ON city.country_slug = country.slug
            WHERE
                ${id.length > 0 ? sql`place.id IN ('${sql.unsafe(id.join("', '"))}') AND` : sql``}
                ${top ? sql`place.top = TRUE AND` : sql``}
                ${countrySlug.length > 0 ? sql`city.country_slug IN ('${sql.unsafe(countrySlug.join("', '"))}') AND` : sql``}
                ${citySlug.length > 0 ? sql`place.city_slug IN ('${sql.unsafe(citySlug.join("', '"))}') AND` : sql``}
                ${placeType.length > 0 ? sql`place.type && ARRAY['${sql.unsafe(placeType.join("', '"))}'] AND` : sql``}
                ${placeTag.length > 0 ? sql`place.tags && ARRAY['${sql.unsafe(placeTag.join("', '"))}'] AND` : sql``}
                ${
                    query
                        ? sql`(
                        place.name % ${query}
                        OR
                        city.name % ${query}
                        OR
                        country.name % ${query}
                        OR
                        ${query} % ANY(place.type)
                        OR
                        ${query} % ANY(place.tags)
                        ) AND`
                        : sql``
                }
                TRUE
            ORDER BY ${query ? sql`score DESC, place.name` : orderBy}
            ${limit ? sql`LIMIT ${limit}` : sql``}
            ${offset ? sql`OFFSET ${offset}` : sql``}
            `
        )
    }
)
