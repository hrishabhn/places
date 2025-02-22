import {z} from 'zod'

import {
    NotionCheckboxSchema,
    NotionCoverSchema,
    NotionMultiSelectSchema,
    NotionOptionalRichTextSchema,
    NotionSelectSchema,
    NotionSingleSelectSchema,
    NotionTitleSchema,
} from '@/lib/notion/types'

export const NotionPlaceSchema = z
    .object({
        id: z.string().uuid(),
        url: z.string().url(),
        cover: NotionCoverSchema,
        properties: z.object({
            name: NotionTitleSchema,
            top: NotionCheckboxSchema,
            city: NotionSingleSelectSchema,
            type: NotionMultiSelectSchema,
            tags: NotionMultiSelectSchema,
            description: NotionOptionalRichTextSchema,
            maps_id: NotionOptionalRichTextSchema,
        }),
    })
    .transform(({id, url, cover, properties}) => ({id, url, cover, ...properties}))

export type NotionPlace = z.infer<typeof NotionPlaceSchema>

const NotionSelectOptionsSchema = z.object({options: z.array(NotionSelectSchema)})

export const AllDropdownSchema = z
    .object({
        city: z.object({select: NotionSelectOptionsSchema}),
        type: z.object({multi_select: NotionSelectOptionsSchema}),
        tags: z.object({multi_select: NotionSelectOptionsSchema}),
    })
    .transform(({city, type, tags}) => ({allCity: city.select.options, allType: type.multi_select.options, allTags: tags.multi_select.options}))
