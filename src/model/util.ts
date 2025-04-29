import {type Place} from '@/server/types'

export function googleMapsUrl(place: Place): string {
    const url = new URL('https://www.google.com/maps/search/')
    url.searchParams.append('api', '1')
    url.searchParams.append('query', `${place.name} ${place.city_name}`)
    if (place.maps_id) url.searchParams.append('query_place_id', place.maps_id)
    return url.toString()
}

export function notionUrl(id: string): string {
    return `https://www.notion.so/${id.replaceAll('-', '')}`
}
