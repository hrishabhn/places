import {z} from 'zod'

import {type MapsPlace} from '@/lib/google-maps'
import {NotionMultiSelectSchema, NotionOptionalRichTextSchema, NotionSingleSelectSchema, NotionTitleSchema} from '@/lib/notion/types'

export const NotionPlaceSchema = z
    .object({
        id: z.string().uuid(),
        url: z.string().url(),
        properties: z.object({
            name: NotionTitleSchema,
            city: NotionSingleSelectSchema,
            type: NotionMultiSelectSchema,
            tags: NotionMultiSelectSchema,
            description: NotionOptionalRichTextSchema,
            maps_id: NotionOptionalRichTextSchema,
        }),
    })
    .transform(({id, url, properties}) => ({id, url, ...properties}))

export type NotionPlace = z.infer<typeof NotionPlaceSchema>
export type PlaceComplete = NotionPlace & {maps_data: MapsPlace | null; maps_photo: string | null}
