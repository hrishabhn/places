'use client'

import {type CookiesFn, getCookie, setCookie} from 'cookies-next'
import {useLocalStorage} from 'usehooks-ts'
import * as z from 'zod/v4'

const BookmarksSchema = z
    .string()
    .optional()
    .transform(value => (value ? JSON.parse(value) : []))
    .pipe(z.array(z.uuid()).catch([]))

export type Bookmarks = z.infer<typeof BookmarksSchema>

export const getBookmarks = async (options: {cookies?: CookiesFn} = {}) => BookmarksSchema.parse(await getCookie('bookmarks', options))
export const toggleBookmark = async (id: string) => {
    const bookmarks = await getBookmarks()
    const newBookmarks = bookmarks.includes(id) ? bookmarks.filter(f => f !== id) : [...bookmarks, id]
    await setCookie('bookmarks', JSON.stringify(newBookmarks))
    return newBookmarks
}

export const useBookmarks = () => {
    const [bookmarks, setBookmarks] = useLocalStorage<Bookmarks>('bookmarks', [], {
        initializeWithValue: false,
        serializer: value => JSON.stringify(value),
        deserializer: value => z.array(z.uuid()).parse(JSON.parse(value)),
    })
    const toggleBookmark = (id: string) => setBookmarks(bookmarks.includes(id) ? bookmarks.filter(f => f !== id) : [...bookmarks, id])
    return {bookmarks, toggleBookmark}
}
