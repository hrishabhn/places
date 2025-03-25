import {type Icon, List, MapPinArea, Sparkle} from '@phosphor-icons/react'

export const allView = ['list', 'map', 'concierge'] as const
export type View = (typeof allView)[number]

export const viewIcon = (view: View): Icon =>
    ({
        list: List,
        map: MapPinArea,
        concierge: Sparkle,
    })[view]

export const viewTitle = (view: View): string =>
    ({
        list: 'List',
        map: 'Map',
        concierge: 'Concierge',
    })[view]
