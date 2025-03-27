import {ChartLineUp, type Icon, List, MapPinArea, Sparkle, Table} from '@phosphor-icons/react'

export const allView = ['list', 'map', 'table', 'stats', 'concierge'] as const
export type View = (typeof allView)[number]

export const viewIcon = (view: View): Icon =>
    ({
        list: List,
        map: MapPinArea,
        table: Table,
        stats: ChartLineUp,
        concierge: Sparkle,
    })[view]

export const viewTitle = (view: View): string =>
    ({
        list: 'List',
        map: 'Map',
        table: 'Table',
        stats: 'Stats',
        concierge: 'Concierge',
    })[view]
