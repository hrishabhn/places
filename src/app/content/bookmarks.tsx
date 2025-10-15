'use client'

import {PlaceCard} from '../views/place/card'

import {useSuspenseQuery} from '@tanstack/react-query'

import {type Bookmarks, useBookmarks} from '@/model/bookmarks'

import {useTRPC} from '@/lib/trpc'

import {ScrollStack} from '@/components/views/scroll'
import {Section} from '@/components/views/section'
import {SectionHeader, SectionHeaderStack} from '@/components/views/section-header'

export function HomeContentBookmarks() {
    const {bookmarks} = useBookmarks()
    if (bookmarks.length === 0) return null
    return <Items bookmarks={bookmarks} />
}

function Items({bookmarks}: {bookmarks: Bookmarks}) {
    const trpc = useTRPC()

    const {data: allPlaceBookmark} = useSuspenseQuery(trpc.GetAllPlace.queryOptions({filter: {id: bookmarks}, sort: 'name'}))

    if (allPlaceBookmark.length === 0) return null

    return (
        <SectionHeaderStack>
            <Section>
                <SectionHeader title="Your Bookmarks" href="/places?bookmarks=true" />
            </Section>
            <ScrollStack>
                {allPlaceBookmark.map(place => (
                    <PlaceCard key={place.id} place={place} />
                ))}
            </ScrollStack>
        </SectionHeaderStack>
    )
}
