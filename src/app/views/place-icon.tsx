'use client'

import {getPlaceIcon} from './place/place-icon'

export function PlaceIcon({placeType}: {placeType: string | undefined}) {
    const Icon = getPlaceIcon(placeType)

    return (
        <div className="flex aspect-video items-center justify-center bg-accent/20 dark:bg-accent-dark/20">
            <Icon size={24} weight="bold" />
        </div>
    )
}
