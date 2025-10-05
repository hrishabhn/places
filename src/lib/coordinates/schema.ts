import {z} from 'zod/v4'

export const CoordinatesSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
})

export type Coordinates = z.infer<typeof CoordinatesSchema>
