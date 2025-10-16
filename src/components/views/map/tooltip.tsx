'use client'

import './tooltip.css'

import {type Icon} from '@phosphor-icons/react'
import {Tooltip} from 'react-leaflet'

import {tw} from '@/lib/tailwind'

type MapTooltipProps = {
    theme: 'accent' | 'blue'
    icon: Icon
    title: string
    subtitle?: string
}

export function MapTooltip({theme, icon: Icon, title, subtitle}: MapTooltipProps) {
    const themeClass = {
        accent: tw`bg-accent-dark text-accent-light dark:bg-accent-light dark:text-accent-dark`,
        blue: tw`bg-blue-500 text-white`,
    }[theme]

    return (
        <Tooltip className="custom" direction="top" opacity={1}>
            <div className="pb-2">
                <div className={`flex items-center gap-2 rounded-2xl px-2.5 py-1.5 font-semibold ${themeClass}`}>
                    <Icon size={24} weight="fill" />
                    <div>
                        <p className="text-sm">{title}</p>
                        {subtitle && <p className="text-xs">{subtitle}</p>}
                    </div>
                </div>
            </div>
        </Tooltip>
    )
}
