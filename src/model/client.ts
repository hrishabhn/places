import 'server-only'

import {citiesPageId, placesPageId} from './config'
import {AllDropdownSchema, NotionCitySchema, NotionPlaceSchema} from './types'

import {Client} from '@notionhq/client'
import {unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag} from 'next/cache'
import {z} from 'zod'

const notion = new Client({auth: process.env.NOTION_API_KEY})

export async function getAllPlace() {
    'use cache'
    cacheTag('notion', 'place')
    cacheLife('seconds')

    let next_cursor: string | null | undefined = undefined
    const pages: unknown[] = []

    while (next_cursor !== null) {
        const response = await notion.databases.query({
            database_id: placesPageId,
            sorts: [{property: 'sort_name', direction: 'ascending'}],
            filter: {
                and: [
                    {property: 'public', checkbox: {equals: true}},
                    {property: 'name', title: {is_not_empty: true}},
                    {property: 'city', select: {is_not_empty: true}},
                ],
            },
            start_cursor: next_cursor,
        })

        next_cursor = response.next_cursor
        pages.push(...response.results)
    }

    return z.array(NotionPlaceSchema).parse(pages)
}

export async function getAllDropdown() {
    'use cache'
    cacheTag('notion', 'dropdown')
    cacheLife('seconds')

    const {properties} = await notion.databases.retrieve({database_id: placesPageId})
    return AllDropdownSchema.parse(properties)
}

export async function getCityImage(name: string) {
    'use cache'
    cacheTag('notion', 'city', name)
    cacheLife('hours')

    const {results} = await notion.databases.query({
        database_id: citiesPageId,
        filter: {property: 'name', title: {equals: name}},
    })

    if (results.length !== 1) return null
    return z.array(NotionCitySchema).parse(results)[0].properties.image
}
