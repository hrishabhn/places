'use client'

import {TableColumn} from './layout'
import {type TableColumnSize} from './shared'

import {ArrowUpRight, CalendarBlank, CaretDown, Clock, CurrencyDollar, Hash, TextAa} from '@phosphor-icons/react'

type TableHeaderType = 'text' | 'number' | 'currency' | 'select' | 'date' | 'datetime' | 'relation'

export function TableHeader({size, type, text}: {size?: TableColumnSize; type: TableHeaderType; text: string}) {
    const Icon = {
        text: TextAa,
        number: Hash,
        currency: CurrencyDollar,
        select: CaretDown,
        date: CalendarBlank,
        datetime: Clock,
        relation: ArrowUpRight,
    }[type]

    return (
        <TableColumn size={size}>
            <div className="flex w-full items-center gap-1 bg-line px-4 py-3 text-sm font-medium dark:bg-line-dark">
                <p className="line-clamp-1">{text}</p>
                <div className="grow" />
                <Icon weight="bold" className="shrink-0" />
            </div>
        </TableColumn>
    )
}
