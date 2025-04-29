export function googleMapsUrl({name, city_name, maps_id}: {name: string; city_name: string; maps_id: string | null}): string {
    const url = new URL('https://www.google.com/maps/search/')
    url.searchParams.append('api', '1')
    url.searchParams.append('query', `${name} ${city_name}`)
    if (maps_id) url.searchParams.append('query_place_id', maps_id)
    return url.toString()
}

export const notionUrl = (id: string): string => `https://www.notion.so/${id.replaceAll('-', '')}`

export const countryFlag = (country_code: string): string => `https://hatscripts.github.io/circle-flags/flags/${country_code.toLowerCase()}.svg`
