'use client'

import {NavigationArrowIcon} from '@phosphor-icons/react'
import {Marker} from 'react-map-gl/maplibre'

import {useCoordinates} from '@/lib/hooks'

export function LocationMarker() {
    const {data: userCoordinates} = useCoordinates()

    if (!userCoordinates) return null

    return (
        <Marker latitude={userCoordinates.latitude} longitude={userCoordinates.longitude} anchor="center" style={{cursor: 'pointer'}}>
            <div className="flex items-center justify-center rounded-full bg-blue-500 p-1 text-white">
                <NavigationArrowIcon size={16} weight="fill" />
            </div>
        </Marker>
    )
}
