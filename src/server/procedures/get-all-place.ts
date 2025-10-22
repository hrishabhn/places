import {getSeed} from '../seed'
import {publicProcedure} from '../trpc'
import {type Place, PlaceSchema} from '../types'

import {z} from 'zod/v4'

import {sql} from '@/model/neon'

export const GetAllPlaceOptions = z.object({
    filter: z
        .object({
            id: z.array(z.uuid()).default([]),
            top: z.boolean().default(false),
            countrySlug: z.array(z.string()).default([]),
            citySlug: z.array(z.string()).default([]),
            placeType: z.array(z.string()).default([]),
            placeTag: z.array(z.string()).default([]),
        })
        .prefault({}),
    query: z.string().default(''),
    sort: z.enum(['name', 'country', 'city', 'first_visit', 'random']),
    limit: z.number().optional(),
})

export const GetAllPlace = publicProcedure.input(GetAllPlaceOptions).query(
    async ({
        input: {
            filter: {id, top, countrySlug, citySlug, placeType, placeTag},
            query,
            sort,
            limit,
        },
    }): Promise<Place[]> => {
        // set limit for similarity
        await sql`select set_limit(0.3)`

        // set random seed
        await sql`select setseed(${getSeed()})`

        // order by
        const orderBy = {
            name: sql`lower(place.name)`,
            country: sql`lower(country.name), lower(place.name)`,
            city: sql`lower(city.name), lower(country.name), lower(place.name)`,
            first_visit: sql`case when place.first_visit is null then 1 else 0 end, place.first_visit DESC, lower(place.name)`,
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
                    place.lon
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
                            (place.name % ${query} OR place.name ILIKE ${`%${query}%`})
                            OR
                            (city.name % ${query} OR city.name ILIKE ${`%${query}%`})
                            OR
                            (country.name % ${query} OR country.name ILIKE ${`%${query}%`})
                            OR
                            (${query} % ANY(place.type) OR ${query} ILIKE ANY(place.type))
                            OR
                            (${query} % ANY(place.tags) OR ${query} ILIKE ANY(place.tags))
                            ) AND`
                            : sql``
                    }
                    TRUE
                ORDER BY ${query ? sql`score DESC, lower(place.name)` : orderBy}
                ${limit ? sql`LIMIT ${limit}` : sql``}
                `
        )
    }
)
