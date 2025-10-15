'use client'

import {PlaceCard} from '../views/place/card'

import {useQueryClient, useSuspenseQuery} from '@tanstack/react-query'
import {parseAsStringLiteral, useQueryState} from 'nuqs'

import {useTRPC} from '@/lib/trpc'

import {MenuBarItem, MenuBarTray} from '@/components/views/menu-bar'
import {ScrollStack} from '@/components/views/scroll'
import {Section} from '@/components/views/section'
import {SectionHeader, SectionHeaderStack} from '@/components/views/section-header'

const allPlacesView = ['recent', 'random'] as const
type PlacesView = (typeof allPlacesView)[number]
const placesViewTitle: Record<PlacesView, string> = {recent: 'Recently Added', random: 'Random Picks'}
const placesViewSort: Record<PlacesView, 'first_visit' | 'random'> = {recent: 'first_visit', random: 'random'}

const limit = 5

export function HomeContentPlaces() {
    // state
    const [selectedView, setSelectedView] = useQueryState('places', parseAsStringLiteral(allPlacesView).withOptions({clearOnDefault: false}).withDefault(allPlacesView[0]))

    // query
    const trpc = useTRPC()
    const queryClient = useQueryClient()

    const {data: allPlace} = useSuspenseQuery(trpc.GetAllPlace.queryOptions({sort: placesViewSort[selectedView], limit}))

    allPlacesView.forEach(view => queryClient.prefetchQuery(trpc.GetAllPlace.queryOptions({sort: placesViewSort[view], limit})))

    return (
        <SectionHeaderStack>
            <Section>
                <SectionHeader title="Suggested Places" href="/places" />
            </Section>
            <MenuBarTray>
                {allPlacesView.map(view => (
                    <button key={view} onClick={() => setSelectedView(view)} className="active:opacity-60">
                        <MenuBarItem active={view === selectedView}>{placesViewTitle[view]}</MenuBarItem>
                    </button>
                ))}
            </MenuBarTray>
            <ScrollStack>
                {allPlace.map(place => (
                    <PlaceCard key={place.id} place={place} />
                ))}
            </ScrollStack>
        </SectionHeaderStack>
    )
}
