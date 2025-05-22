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
    },
    {},
    {basePath: '/api/mcp'}
)

export {handler as GET, handler as POST}
