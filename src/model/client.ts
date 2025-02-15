import {database_id} from './config'
import {NotionPlaceSchema, type PlaceComplete} from './types'

import {Client} from '@notionhq/client'
import 'server-only'
import {z} from 'zod'

import {getPhoto, getPlaceDetails} from '@/lib/google-maps'
import {NotionSelectSchema} from '@/lib/notion/types'

const notion = new Client({auth: process.env.NOTION_API_KEY})

const PlaceSchema = NotionPlaceSchema.transform(async notionPlace => {
    const maps_data = notionPlace.maps_id ? await getPlaceDetails(notionPlace.maps_id) : null
    const photo_reference = maps_data?.photos?.at(0)?.photo_reference
    const maps_photo = photo_reference ? await getPhoto(photo_reference) : null
    return {...notionPlace, maps_data, maps_photo}
})

export async function getAllPlace(): Promise<PlaceComplete[]> {
    let next_cursor: string | null | undefined = undefined
    const pages: unknown[] = []

    while (next_cursor !== null) {
        const response = await notion.databases.query({
            database_id,
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

    return await z.array(PlaceSchema).parseAsync(pages)
}

const NotionSelectOptionsSchema = z.object({options: z.array(NotionSelectSchema)})
const AllDropdownSchema = z
    .object({
        city: z.object({select: NotionSelectOptionsSchema}),
        type: z.object({multi_select: NotionSelectOptionsSchema}),
        tags: z.object({multi_select: NotionSelectOptionsSchema}),
    })
    .transform(({city, type, tags}) => ({allCity: city.select.options, allType: type.multi_select.options, allTags: tags.multi_select.options}))

export async function getAllDropdown() {
    const {properties} = await notion.databases.retrieve({database_id})
    return AllDropdownSchema.parse(properties)
}
