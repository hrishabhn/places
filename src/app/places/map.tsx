'use client'

import {getPlaceIcon} from '../views/place/place-icon'

import {type Place} from '@/server/types'

import {MapView} from '@/components/views/map'

type PlaceWithCoordinates = Place & {lat: number; lon: number}
const isPlaceWithCoordinates = (place: Place): place is PlaceWithCoordinates => place.lat !== null && place.lon !== null

export function PlacesMap({allPlace}: {allPlace: Place[]}) {
    return (
        <div className="mb-4 aspect-square max-h-96 w-full overflow-hidden rounded-md ring-1 ring-line sm:aspect-video dark:ring-line-dark">
            <MapView
                allPlace={allPlace.filter(isPlaceWithCoordinates).map(place => ({
                    id: place.id,
                    title: place.name,
                    subtitle: place.type.at(0),
                    lat: place.lat,
                    lon: place.lon,
                    icon: getPlaceIcon(place.type.at(0)),
                }))}
            />
        </div>
    )
}
