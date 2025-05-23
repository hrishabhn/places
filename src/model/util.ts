export function googleMapsUrl({name, city_name, maps_id}: {name: string; city_name: string; maps_id: string | null}): string {
    const url = new URL('https://www.google.com/maps/search/')
    url.searchParams.append('api', '1')
    url.searchParams.append('query', `${name} ${city_name}`)
    if (maps_id) url.searchParams.append('query_place_id', maps_id)
    return url.toString()
}

export const notionUrl = (id: string): string => `https://www.notion.so/${id.replaceAll('-', '')}`

export function countryFlag(country_code: string): string {
    if (country_code.length !== 2) throw new Error('Invalid country code')
    return `https://hatscripts.github.io/circle-flags/flags/${country_code.toLowerCase()}.svg`
}

export function setsEqual<T extends string>(a: Set<T>, b: Set<T>): boolean {
    if (a.size !== b.size) return false
    return [...a].every(value => b.has(value))
}
