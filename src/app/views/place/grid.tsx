'use client'

import {PlaceCard} from './card'

import {type Place} from '@/server/types'

import {GridStack} from '@/components/views/grid'

type PlaceGridProps = {
    allPlace: Place[]
    bookmarks: string[]
    onToggleBookmark: (id: string) => void
}

export function PlaceGrid({allPlace, bookmarks, onToggleBookmark}: PlaceGridProps) {
    return (
        <GridStack>
            {allPlace.map(place => (
                <PlaceCard key={place.id} place={place} bookmark={bookmarks.includes(place.id)} onBookmark={() => onToggleBookmark(place.id)} />
            ))}
        </GridStack>
    )
}
