'use client'

import {MapActions} from './actions'
import {CustomMarker} from './custom-marker'
import {LocationMarker} from './location'
import {useMapStyle} from './map-style'

import {type Icon, MapPinIcon} from '@phosphor-icons/react'
import {LngLat, LngLatBounds} from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import Map from 'react-map-gl/maplibre'

type MapPin = {
    id: string
    title: string
    subtitle?: string
    lat: number
    lon: number
    icon?: Icon
}

type MapViewProps = {
    pins: MapPin[]
    onClose?: () => void
}

export function MapView({pins, onClose}: MapViewProps) {
    const mapStyle = useMapStyle()

    const bounds =
        pins.length > 0
            ? new LngLatBounds(
                  new LngLat(Math.min(...pins.map(({lon}) => lon)), Math.min(...pins.map(({lat}) => lat))),
                  new LngLat(Math.max(...pins.map(({lon}) => lon)), Math.max(...pins.map(({lat}) => lat)))
              )
            : undefined

    return (
        <Map
            minZoom={1}
            initialViewState={{
                bounds,
                fitBoundsOptions: {padding: 50},
            }}
            mapStyle={mapStyle}
            attributionControl={false}
        >
            {pins.map(pin => (
                <CustomMarker key={pin.id} lat={pin.lat} lon={pin.lon} icon={pin.icon || MapPinIcon} title={pin.title} subtitle={pin.subtitle} />
            ))}
            <LocationMarker />

            <MapActions onClose={onClose} bounds={bounds} />
        </Map>
    )
}
