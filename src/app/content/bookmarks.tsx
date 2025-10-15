'use client'

import {PlaceCard} from '../views/place/card'

import {useQuery} from '@tanstack/react-query'

import {type Bookmarks, useBookmarks} from '@/model/bookmarks'

import {useTRPC} from '@/lib/trpc'

import {ScrollStack} from '@/components/views/scroll'
import {Section} from '@/components/views/section'
import {SectionHeader, SectionHeaderStack} from '@/components/views/section-header'
import {ErrorView, LoadingView} from '@/components/views/state'

export function HomeContentBookmarks() {
    const {bookmarks} = useBookmarks()
    if (bookmarks.length === 0) return null

    return (
        <SectionHeaderStack>
            <Section>
                <SectionHeader title="Your Bookmarks" href={{pathname: '/places', query: {bookmarks: true}}} />
            </Section>
            <Items bookmarks={bookmarks} />
        </SectionHeaderStack>
    )
}

function Items({bookmarks}: {bookmarks: Bookmarks}) {
    const trpc = useTRPC()

    const {status: allPlaceBookmarkStatus, data: allPlaceBookmark} = useQuery(trpc.GetAllPlace.queryOptions({filter: {id: bookmarks}, sort: 'name'}))

    if (allPlaceBookmarkStatus === 'pending') return <LoadingView />
    if (allPlaceBookmarkStatus === 'error') return <ErrorView />

    if (allPlaceBookmarkStatus === 'success' && allPlaceBookmark.length === 0) return null

    return (
        <ScrollStack>
            {allPlaceBookmark.map(place => (
                <PlaceCard key={place.id} place={place} />
            ))}
        </ScrollStack>
    )
}
