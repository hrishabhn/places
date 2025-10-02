'use client'

import {customDivIcon} from './custom-icon'
import {MapTooltip} from './tooltip'

import {type Icon, MapPinIcon, NavigationArrowIcon} from '@phosphor-icons/react'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet/dist/leaflet.css'
import {MapContainer, Marker, TileLayer} from 'react-leaflet'
import {useMediaQuery} from 'usehooks-ts'

import {useCoordinates} from '@/lib/hooks'

// type and assertion
type MapPin = {
    id: string
    title: string
    subtitle?: string
    lat: number
    lon: number
    icon?: Icon
}

export function MapViewContent({allPlace: displayPlace}: {allPlace: MapPin[]}) {
    const isDark = useMediaQuery('(prefers-color-scheme: dark)')
    const {data: userCoordinates} = useCoordinates()

    const avgLat = displayPlace.map(({lat}) => lat).reduce((a, b) => a + b, 0) / displayPlace.length
    const avgLon = displayPlace.map(({lon}) => lon).reduce((a, b) => a + b, 0) / displayPlace.length

    return (
        <MapContainer
            className="z-0 size-full"
            zoomControl={false}
            center={[avgLat, avgLon]}
            minZoom={2}
            bounds={displayPlace.length > 0 ? displayPlace.map(({lat, lon}) => [lat, lon]) : undefined}
            boundsOptions={{padding: [50, 50]}}
        >
            <TileLayer url={`https://tiles.stadiamaps.com/tiles/alidade_smooth${isDark ? '_dark' : ''}/{z}/{x}/{y}{r}.png`} />

            {displayPlace.map(place => (
                <Marker key={place.id} icon={customDivIcon({theme: 'accent', icon: place.icon || MapPinIcon})} position={[place.lat, place.lon]}>
                    <MapTooltip theme="accent" icon={place.icon || MapPinIcon} title={place.title} subtitle={place.subtitle} />
                </Marker>
            ))}

            {userCoordinates && (
                <Marker icon={customDivIcon({theme: 'blue', icon: NavigationArrowIcon})} zIndexOffset={1} position={[userCoordinates.latitude, userCoordinates.longitude]}>
                    <MapTooltip theme="blue" icon={NavigationArrowIcon} title="Your Location" />
                </Marker>
            )}
        </MapContainer>
    )
}
