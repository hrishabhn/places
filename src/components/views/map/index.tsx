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

    const bounds: [number, number, number, number] | undefined = (() => {
        if (pins.length === 0) return undefined
        const bounds = new LngLatBounds()
        for (const pin of pins) bounds.extend(new LngLat(pin.lon, pin.lat))
        return [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]
    })()

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
