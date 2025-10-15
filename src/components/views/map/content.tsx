'use client'

import {customDivIcon} from './custom-icon'
import {MapTooltip} from './tooltip'

import {ArrowsInSimpleIcon, type Icon, MapPinIcon, NavigationArrowIcon, XIcon} from '@phosphor-icons/react'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet/dist/leaflet.css'
import {MapContainer, Marker, TileLayer, useMap} from 'react-leaflet'
import {useMediaQuery} from 'usehooks-ts'

import {type Coordinates} from '@/lib/coordinates'
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

type Bounds = [number, number][]

type MapViewContentProps = {
    onClose?: () => void
    allPlace: MapPin[]
}

export function MapViewContent({onClose, allPlace: displayPlace}: MapViewContentProps) {
    const isDark = useMediaQuery('(prefers-color-scheme: dark)')
    const {data: userCoordinates} = useCoordinates()

    const bounds: Bounds = displayPlace.length > 0 ? displayPlace.map(({lat, lon}) => [lat, lon]) : [[0, 0]]

    return (
        <MapContainer className="z-0 size-full" zoomControl={false} minZoom={2} bounds={bounds} boundsOptions={{padding: [50, 50]}}>
            <TileLayer url={`https://tiles.stadiamaps.com/tiles/alidade_smooth${isDark ? '_dark' : ''}/{z}/{x}/{y}{r}.png`} />

            <MapActions onClose={onClose} bounds={bounds} coordinates={userCoordinates ?? undefined} />

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

type MapActionsProps = {
    onClose?: () => void
    bounds: Bounds
    coordinates: Coordinates | undefined
}

function MapActions({onClose, bounds, coordinates}: MapActionsProps) {
    const map = useMap()

    return (
        <div className="absolute right-4 top-4 z-[1000] grid auto-cols-auto grid-flow-row gap-1.5">
            {onClose && (
                <button onClick={onClose} className="active:opacity-60">
                    <MapButton icon={XIcon} />
                </button>
            )}

            <button onClick={() => map.fitBounds(bounds, {padding: [50, 50]})} className="active:opacity-60">
                <MapButton icon={ArrowsInSimpleIcon} />
            </button>

            {coordinates !== undefined && (
                <button onClick={() => map.setView([coordinates.latitude, coordinates.longitude], 15)} className="active:opacity-60">
                    <MapButton icon={NavigationArrowIcon} />
                </button>
            )}
        </div>
    )
}

function MapButton({icon: Icon}: {icon: Icon}) {
    return (
        <div className="flex size-8 items-center justify-center rounded-xl bg-accent-dark text-accent-light shadow backdrop-blur">
            <Icon size={20} weight="bold" />
        </div>
    )
}
