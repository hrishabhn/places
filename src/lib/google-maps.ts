'use cache'

import {unstable_cacheLife as cacheLife} from 'next/cache'
import {z} from 'zod'

// api key
const key = process.env.GOOGLE_MAPS_API_KEY!

// schema
const PlaceDetailsSchema = z.object({
    photos: z.array(z.object({name: z.string()})),
})

const PlacePhotoSchema = z.object({
    name: z.string(),
    photoUri: z.string().url(),
})

// types
type PlaceDetails = z.infer<typeof PlaceDetailsSchema>
type PlacePhoto = z.infer<typeof PlacePhotoSchema>

export async function getPlaceDetails(place_id: string): Promise<PlaceDetails> {
    cacheLife('weeks')

    // build url
    const url = new URL(`https://places.googleapis.com/v1/places/${place_id}`)
    url.searchParams.set('key', key)
    url.searchParams.set('fields', ['photos'].join(','))

    // fetch and parse
    const response = await fetch(url.toString()).then(res => res.json())
    return PlaceDetailsSchema.parse(response)
}

export async function getPlacePhoto(name: string): Promise<PlacePhoto> {
    cacheLife('weeks')

    // build url
    const url = new URL(`https://places.googleapis.com/v1/${name}/media`)
    url.searchParams.set('key', key)
    url.searchParams.set('maxWidthPx', '1920')
    url.searchParams.set('skipHttpRedirect', 'true')

    // fetch and parse
    const response = await fetch(url.toString()).then(res => res.json())
    return PlacePhotoSchema.parse(response)
}
