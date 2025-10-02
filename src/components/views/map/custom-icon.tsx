'use client'

import {type Icon} from '@phosphor-icons/react'
import {DivIcon} from 'leaflet'
import {renderToStaticMarkup} from 'react-dom/server'

import {tw} from '@/lib/tailwind'

type CustomDivIconProps = {
    theme: 'accent' | 'blue'
    icon: Icon
}

export function customDivIcon({theme, icon: Icon}: CustomDivIconProps) {
    const themeClass = {
        accent: tw`bg-olive text-cream dark:bg-cream dark:text-olive`,
        blue: tw`bg-blue-500 text-white`,
    }[theme]

    const html = renderToStaticMarkup(
        <div className="flex size-8 flex-col items-center">
            <div className={`flex size-6 items-center justify-center rounded-full ${themeClass}`}>
                <Icon size={16} weight="fill" />
            </div>
            <div className={`-mt-1 w-1 flex-1 rounded-b-full ${themeClass}`} />
        </div>
    )

    return new DivIcon({
        html,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    })
}
