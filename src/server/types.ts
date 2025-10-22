import * as z from 'zod'

export const CountrySchema = z.object({
    slug: z.string(),
    name: z.string(),
    code: z.string(),
    city_count: z.coerce.number(),
    place_count: z.coerce.number(),
})

export type Country = z.infer<typeof CountrySchema>

export const CitySchema = z.object({
    slug: z.string(),
    name: z.string(),
    country_slug: z.string(),
    country_name: z.string(),
    country_code: z.string(),
    image: z.string().nullable(),
    icon: z.url().nullable(),
    place_count: z.coerce.number(),
})

export type City = z.infer<typeof CitySchema>

export const PlaceSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    top: z.boolean(),
    city_slug: z.string(),
    city_name: z.string(),
    country_slug: z.string(),
    country_name: z.string(),
    country_code: z.string(),
    type: z.array(z.string()),
    tags: z.array(z.string()),
    image: z.string().nullable(),
    description: z.string().nullable(),
    // first_visit: z.date().nullable(),
    // last_visit: z.date().nullable(),
    maps_id: z.string().nullable(),
    lat: z.coerce.number().nullable(),
    lon: z.coerce.number().nullable(),
    // created: z.date(),
    // modified: z.date(),
})

export type Place = z.infer<typeof PlaceSchema>

// place filters
export const PlaceTypeSchema = z.object({
    type_name: z.string(),
    place_count: z.coerce.number(),
})

export type PlaceType = z.infer<typeof PlaceTypeSchema>

export const PlaceTagSchema = z.object({
    tag_name: z.string(),
    place_count: z.coerce.number(),
})

export type PlaceTag = z.infer<typeof PlaceTagSchema>

// input
export const SearchInputSchema = z.object({
    query: z.string(),
})
