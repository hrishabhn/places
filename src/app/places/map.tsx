'use client'

import {type Place} from '@/server/types'

import {MapView} from '@/components/views/map'

export function PlacesMap({allPlace}: {allPlace: Place[]}) {
    return (
        <div className="mb-4 aspect-square max-h-96 w-full overflow-hidden rounded-md ring-1 ring-line sm:aspect-video dark:ring-line-dark">
            <MapView allPlace={allPlace} />
        </div>
    )
}
