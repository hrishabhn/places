import {z} from 'zod'

import {getPlaceDetails, getPlacePhoto} from '@/lib/google-maps'
import {NotionCheckboxSchema, NotionMultiSelectSchema, NotionOptionalRichTextSchema, NotionSelectSchema, NotionSingleSelectSchema, NotionTitleSchema} from '@/lib/notion/types'

const NotionPlaceSchema = z
    .object({
        id: z.string().uuid(),
        url: z.string().url(),
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
    .transform(({id, url, properties}) => ({id, url, ...properties}))

export const PlaceCompleteSchema = NotionPlaceSchema.transform(async notionPlace => {
    if (!notionPlace.maps_id) return {...notionPlace, maps_photo: null}

    const photoName = (await getPlaceDetails(notionPlace.maps_id)).photos?.at(0)?.name
    if (!photoName) return {...notionPlace, maps_photo: null}

    const {photoUri: maps_photo} = await getPlacePhoto(photoName)
    return {...notionPlace, maps_photo}
})

const NotionSelectOptionsSchema = z.object({options: z.array(NotionSelectSchema)})
export const AllDropdownSchema = z
    .object({
        city: z.object({select: NotionSelectOptionsSchema}),
        type: z.object({multi_select: NotionSelectOptionsSchema}),
        tags: z.object({multi_select: NotionSelectOptionsSchema}),
    })
    .transform(({city, type, tags}) => ({allCity: city.select.options, allType: type.multi_select.options, allTags: tags.multi_select.options}))
