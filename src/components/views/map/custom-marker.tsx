'use client'

import {type Icon} from '@phosphor-icons/react'
import {Marker} from 'react-map-gl/maplibre'

type CustomMarkerProps = {
    lat: number
    lon: number
    icon: Icon
    title: string
    subtitle?: string
}

export function CustomMarker({lat, lon, icon: Icon, title, subtitle}: CustomMarkerProps) {
    return (
        <Marker latitude={lat} longitude={lon} anchor="bottom" className="hover:z-10">
            <div className="flex flex-col items-center">
                <div className="group flex cursor-pointer items-center justify-center gap-2 rounded-full bg-accent-dark p-1 text-accent-light hover:rounded-2xl hover:px-2.5 hover:py-1.5 dark:bg-accent-light dark:text-accent-dark">
                    <Icon size={16} weight="fill" />
                    <div className="hidden font-semibold group-hover:block">
                        <p className="text-sm">{title}</p>
                        {subtitle && <p className="text-xs">{subtitle}</p>}
                    </div>
                </div>
                <div className="-mt-1 h-3 w-1 rounded-b-full bg-accent-dark text-accent-light dark:bg-accent-light dark:text-accent-dark" />
            </div>
        </Marker>
    )
}
