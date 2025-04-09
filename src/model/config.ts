import 'server-only'

import {z} from 'zod'

const envVariables = z.object({
    NOTION_API_KEY: z.string(),
    MAIN_PAGE_ID: z.string(),
    CITIES_PAGE_ID: z.string(),
    PLACES_PAGE_ID: z.string(),
})

export const {
    //
    NOTION_API_KEY: notionApiKey,
    MAIN_PAGE_ID: mainPageId,
    CITIES_PAGE_ID: citiesPageId,
    PLACES_PAGE_ID: placesPageId,
} = envVariables.parse(process.env)
