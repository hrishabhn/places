'use client'

import {type Icon, MapPinIcon} from '@phosphor-icons/react'
import {Marker} from 'react-map-gl/maplibre'

import {tw} from '@/lib/tailwind'

import {type TailwindColor} from '@/components/ui'

type CustomMarkerProps = {
    lat: number
    lon: number
    icon?: Icon
    title: string
    subtitle?: string
    color?: TailwindColor
}

export function CustomMarker({lat, lon, icon: Icon = MapPinIcon, title, subtitle, color = 'accent'}: CustomMarkerProps) {
    const colorClass = {
        accent: tw`bg-accent-dark text-accent-light dark:bg-accent-light dark:text-accent-dark`,
        g: tw`bg-g-500 text-white`,
        red: tw`bg-red-500 text-white dark:bg-red-600`,
        orange: tw`bg-orange-500 text-white dark:bg-orange-600`,
        amber: tw`bg-amber-500 text-white dark:bg-amber-600`,
        yellow: tw`bg-yellow-500 text-white dark:bg-yellow-600`,
        lime: tw`bg-lime-500 text-white dark:bg-lime-600`,
        green: tw`bg-green-500 text-white dark:bg-green-600`,
        emerald: tw`bg-emerald-500 text-white dark:bg-emerald-600`,
        teal: tw`bg-teal-500 text-white dark:bg-teal-600`,
        cyan: tw`bg-cyan-500 text-white dark:bg-cyan-600`,
        sky: tw`bg-sky-500 text-white dark:bg-sky-600`,
        blue: tw`bg-blue-500 text-white dark:bg-blue-600`,
        indigo: tw`bg-indigo-500 text-white dark:bg-indigo-600`,
        violet: tw`bg-violet-500 text-white dark:bg-violet-600`,
        purple: tw`bg-purple-500 text-white dark:bg-purple-600`,
        fuchsia: tw`bg-fuchsia-500 text-white dark:bg-fuchsia-600`,
        pink: tw`bg-pink-500 text-white dark:bg-pink-600`,
        rose: tw`bg-rose-500 text-white dark:bg-rose-600`,
    }[color]

    return (
        <Marker latitude={lat} longitude={lon} anchor="bottom" className="hover:z-10">
            <div className="flex flex-col items-center">
                <div className={`group flex cursor-pointer items-center justify-center gap-2 rounded-full p-1 hover:rounded-2xl hover:px-2.5 hover:py-1.5 ${colorClass}`}>
                    <Icon size={16} weight="fill" />
                    <div className="hidden font-semibold group-hover:block">
                        <p className="text-sm">{title}</p>
                        {subtitle && <p className="text-xs">{subtitle}</p>}
                    </div>
                </div>
                <div className={`-mt-1 h-3 w-1 rounded-b-full ${colorClass}`} />
            </div>
        </Marker>
    )
}
