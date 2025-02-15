import {Client, type Place as MapsPlace} from '@googlemaps/google-maps-services-js'

const key = process.env.GOOGLE_MAPS_API_KEY!
const client = new Client()

export async function getPlaceDetails(place_id: string): Promise<MapsPlace> {
    return (
        await client.placeDetails({
            params: {
                key,
                place_id,
                fields: ['formatted_address', 'url', 'photos'],
            },
        })
    ).data.result
}

export async function getPhoto(photoreference: string): Promise<string | null> {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/photo?${new URLSearchParams({maxwidth: '1000', photoreference, key}).toString()}`, {
        redirect: 'manual',
        next: {revalidate: 60 * 60 * 24},
    })
    return response.headers.get('location')
}

export {type MapsPlace}
