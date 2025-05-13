import {type CookiesFn, getCookie, setCookie} from 'cookies-next'
import {z} from 'zod'

const BookmarksSchema = z
    .string()
    .optional()
    .transform(value => (value ? JSON.parse(value) : []))
    .pipe(z.array(z.string().uuid()).catch([]))

export type Bookmarks = z.infer<typeof BookmarksSchema>

export const getBookmarks = async (options: {cookies?: CookiesFn} = {}) => BookmarksSchema.parse(await getCookie('bookmarks', options))
export const toggleBookmark = async (id: string) => {
    const bookmarks = await getBookmarks()
    const newBookmarks = bookmarks.includes(id) ? bookmarks.filter(f => f !== id) : [...bookmarks, id]
    await setCookie('bookmarks', JSON.stringify(newBookmarks))
    return newBookmarks
}
