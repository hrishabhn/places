import {publicProcedure} from '../trpc'
import {type City, CitySchema} from '../types'

import {z} from 'zod'

import {sql} from '@/model/neon'

export const GetAllCity = publicProcedure
    .input(
        z.object({
            filter: z
                .object({
                    countrySlug: z.array(z.string()).default([]),
                })
                .default({}),
            query: z.string().default(''),
            sort: z.enum(['place_count', 'country', 'name']),
            limit: z.number().optional(),
        })
    )
    .query(
        async ({
            input: {
                filter: {countrySlug},
                query,
                sort,
                limit,
            },
        }): Promise<City[]> => {
            // set limit for similarity
            await sql`select set_limit(0.3)`

            // order by
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
                    ${
                        query
                            ? sql`,
                            GREATEST(
                                similarity(city.name, ${query})
                                ,
                                similarity(country.name, ${query}) * 0.9
                            ) as score`
                            : sql``
                    }
                FROM city
                JOIN country ON city.country_slug = country.slug
                WHERE
                    ${countrySlug.length > 0 ? sql`city.country_slug IN ('${sql.unsafe(countrySlug.join("', '"))}') AND` : sql``}
                    ${
                        query
                            ? sql`(
                            (city.name % ${query} OR city.name ILIKE ${`%${query}%`})
                            OR
                            (country.name % ${query} OR country.name ILIKE ${`%${query}%`})
                            ) AND`
                            : sql``
                    }
                    TRUE
                GROUP BY city.slug, country_name, country_code
                ORDER BY ${query ? sql`score DESC, city.name` : orderBy}
                ${limit ? sql`LIMIT ${limit}` : sql``}
                `
            )
        }
    )
