import {createMcpHandler} from '@vercel/mcp-adapter'

import {appRouter} from '@/server'
import {GetAllCityOptions} from '@/server/procedures/get-all-city'
import {GetAllCountryOptions} from '@/server/procedures/get-all-country'
import {GetAllPlaceOptions} from '@/server/procedures/get-all-place'

// api caller
const caller = appRouter.createCaller({})

// to content
const toContent = <T>(data: T): {content: [{type: 'text'; text: string}]} => ({
    content: [{type: 'text', text: JSON.stringify(data)}],
})

const handler = createMcpHandler(
    server => {
        server.tool('StartHere', 'Call this tool before doing anything else for a workflow to effectively search and filter places', {}, () => ({
            content: [
                {
                    type: 'text',
                    text: [
                        '## Follow this workflow to effectively search and filter places:',
                        '',
                        '1. **Get Filter Values First**:',
                        '   - Use `GetAllCountry` to get all countries',
                        '   - Use `GetAllCity` to get all cities',
                        '   - Use `GetAllPlaceType` to get all place types',
                        '   - Use `GetAllPlaceTag` to get all place tags',
                        '',
                        '2. **Search Places with Filters**:',
                        '   - Only call `GetAllPlace` once you have determined the appropriate filters',
                        '   - Apply filters like `countrySlug`, `citySlug`, `placeType`, and `placeTag` based on values from previous calls',
                        '   - Multiple values can be provided for `countrySlug`, `citySlug`, `placeType`, and `placeTag`',
                        '   - Use the `limit` parameter to control the number of results returned',
                        '',
                        '3. **Filter Optimization**:',
                        '   - Apply country filters before city filters',
                        '   - Combine multiple filter types for more specific results',
                        "   - Use the 'top' filter to highlight featured places",
                        '   - Use the search query parameter for text-based searches',
                        '',
                        '4. **Get Place Page URL**:',
                        '   - Use `GetAllPlacePageURL` to get the URL for the places page based on your query and filters',
                        '   - Present this URL to users for easy access to the filtered places page',
                        '',
                        'This sequential workflow ensures you get the most accurate and relevant place data.',
                    ].join('\n'),
                },
            ],
        }))

        // get all country
        server.tool('GetAllCountry', 'Get all countries', GetAllCountryOptions.shape, async options => toContent(await caller.GetAllCountry(options)))
        // get all city
        server.tool('GetAllCity', 'Get all cities', GetAllCityOptions.shape, async options => toContent(await caller.GetAllCity(options)))

        // get all place type
        server.tool('GetAllPlaceType', 'Get all place types', {}, async () => toContent(await caller.GetAllPlaceType()))
        // get all place tag
        server.tool('GetAllPlaceTag', 'Get all place tags', {}, async () => toContent(await caller.GetAllPlaceTag()))

        // get all place
        server.tool('GetAllPlace', 'Get all places', GetAllPlaceOptions.shape, async options => toContent(await caller.GetAllPlace(options)))

        // get all place page URL
        server.tool('GetAllPlacePageURL', 'Get the URL for the places page given a query', GetAllPlaceOptions.shape, async options => {
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
