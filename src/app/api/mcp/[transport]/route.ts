import {createMcpHandler} from 'mcp-handler'

import {GetAllCityOptions, GetAllCountryOptions, GetAllPlaceOptions, db} from '@/server/db/client'

// to content
const toContent = <T>(data: T): {content: [{type: 'text'; text: string}]} => ({
    content: [{type: 'text', text: JSON.stringify(data)}],
})

const handler = createMcpHandler(
    server => {
        // get all country
        server.registerTool('get_all_country', {inputSchema: GetAllCountryOptions.shape}, async options => toContent(await db.country.getAll(options)))
        // get all city
        server.registerTool('get_all_city', {inputSchema: GetAllCityOptions.shape}, async options => toContent(await db.city.getAll(options)))
        // get all place type
        server.registerTool('get_all_place_type', {}, async () => toContent(await db.placeType.getAll()))
        // get all place tag
        server.registerTool('get_all_place_tag', {}, async () => toContent(await db.placeTag.getAll()))
        // get all place
        server.registerTool('get_all_place', {inputSchema: GetAllPlaceOptions.shape}, async options => toContent(await db.place.getAll(options)))
        // get all place page URL
        server.registerTool('get_all_place_page_url', {inputSchema: GetAllPlaceOptions.shape}, async options => {
            const url = new URL(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/places`)
            if (options.filter.top) url.searchParams.set('top', 'true')
            if (options.filter.countrySlug.length > 0) url.searchParams.set('country', options.filter.countrySlug.join(','))
            if (options.filter.citySlug.length > 0) url.searchParams.set('city', options.filter.citySlug.join(','))
            if (options.filter.placeType.length > 0) url.searchParams.set('type', options.filter.placeType.join(','))
            if (options.filter.placeTag.length > 0) url.searchParams.set('tag', options.filter.placeTag.join(','))
            if (options.query) url.searchParams.set('query', options.query)
            url.searchParams.set('sort', options.sort)
            return toContent(url.toString())
        })
    },
    {},
    {basePath: '/api/mcp'}
)

export {handler as GET, handler as POST}
