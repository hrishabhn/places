'use client'

import {ArrowsInSimpleIcon, type Icon, NavigationArrowIcon, XIcon} from '@phosphor-icons/react'
import {type LngLatBounds} from 'maplibre-gl'
import {useMap} from 'react-map-gl/maplibre'

import {useCoordinates} from '@/lib/hooks'

type MapActionsProps = {
    onClose?: () => void
    bounds: LngLatBounds | undefined
}

export function MapActions({onClose, bounds}: MapActionsProps) {
    const {current: map} = useMap()
    const {data: userCoordinates} = useCoordinates()

    return (
        <div className="absolute right-4 top-4 z-[1000] grid auto-cols-auto grid-flow-row gap-1.5">
            {onClose ? (
                <button onClick={onClose} className="active:opacity-60">
                    <MapButton icon={XIcon} />
                </button>
            ) : null}

            {map !== undefined ? (
                <>
                    <button onClick={() => (bounds ? map.fitBounds(bounds, {padding: 50}) : map.flyTo({center: [0, 0], zoom: 1}))} className="active:opacity-60">
                        <MapButton icon={ArrowsInSimpleIcon} />
                    </button>

                    {userCoordinates ? (
                        <button
                            onClick={() =>
                                map.flyTo({
                                    center: [userCoordinates.longitude, userCoordinates.latitude],
                                    zoom: 15,
                                })
                            }
                            className="active:opacity-60"
                        >
                            <MapButton icon={NavigationArrowIcon} />
                        </button>
                    ) : null}
                </>
            ) : null}
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
