'use client'

import {PlaceCard} from '../views/place/card'

import {useQuery} from '@tanstack/react-query'
import {parseAsStringLiteral, useQueryState} from 'nuqs'

import {useTRPC} from '@/lib/trpc'

import {MenuBarItem, MenuBarTray} from '@/components/views/menu-bar'
import {ScrollStack} from '@/components/views/scroll'
import {ErrorView, LoadingView} from '@/components/views/state'

const allPlacesView = ['recent', 'random'] as const
type PlacesView = (typeof allPlacesView)[number]
const placesViewTitle: Record<PlacesView, string> = {recent: 'Recently Added', random: 'Random Picks'}
const placesViewSort: Record<PlacesView, 'first_visit' | 'random'> = {recent: 'first_visit', random: 'random'}

const limit = 5

export function HomeContentPlaces() {
    const [selectedView, setSelectedView] = useQueryState('places', parseAsStringLiteral(allPlacesView).withOptions({clearOnDefault: false}).withDefault(allPlacesView[0]))

    return (
        <>
            <MenuBarTray>
                {allPlacesView.map(view => (
                    <button key={view} onClick={() => setSelectedView(view)} className="active:opacity-60">
                        <MenuBarItem active={view === selectedView}>{placesViewTitle[view]}</MenuBarItem>
                    </button>
                ))}
            </MenuBarTray>
            <Items view={selectedView} />
        </>
    )
}

function Items({view}: {view: PlacesView}) {
    const trpc = useTRPC()

    const {status: allPlaceStatus, data: allPlace} = useQuery(trpc.GetAllPlace.queryOptions({sort: placesViewSort[view], limit}))

    if (allPlaceStatus === 'pending') return <LoadingView />
    if (allPlaceStatus === 'error') return <ErrorView />

    return (
        <ScrollStack>
            {allPlace.map(place => (
                <PlaceCard key={place.id} place={place} />
            ))}
        </ScrollStack>
    )
}
