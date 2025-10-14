'use client'

import {PlaceCard} from '../views/place/card'
import {SectionHeader} from './section-header'

import {useSuspenseQuery} from '@tanstack/react-query'
import {parseAsStringLiteral, useQueryState} from 'nuqs'

import {useTRPC} from '@/lib/trpc'

import {MenuBarItem, MenuBarTray} from '@/components/views/menu-bar'
import {ScrollStack} from '@/components/views/scroll'
import {Section} from '@/components/views/section'

const allPlacesView = ['recent', 'random'] as const
type PlacesView = (typeof allPlacesView)[number]
const placesViewTitle: Record<PlacesView, string> = {recent: 'Recently Added', random: 'Random Picks'}

export function HomeContentPlaces() {
    // state
    const [selectedView, setSelectedView] = useQueryState('places', parseAsStringLiteral(allPlacesView).withOptions({clearOnDefault: false}).withDefault(allPlacesView[0]))
    const sort = ({recent: 'first_visit', random: 'random'} as const)[selectedView]

    // query
    const trpc = useTRPC()

    const {data: allPlace} = useSuspenseQuery(trpc.GetAllPlace.queryOptions({sort, limit: 5}))

    return (
        <>
            <div className="flex w-full flex-col gap-2 overflow-hidden">
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
            </div>
            <ScrollStack>
                {allPlace.map(place => (
                    <PlaceCard key={place.id} place={place} />
                ))}
            </ScrollStack>
        </>
    )
}
