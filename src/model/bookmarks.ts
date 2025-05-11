import {z} from 'zod'

export const BookmarksSchema = z
    .string()
    .optional()
    .transform(value => (value ? JSON.parse(value) : []))
    .pipe(z.array(z.string().uuid()).catch([]))
