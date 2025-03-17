'use client'

import {type ReorderItemProps} from './types'

import {DotsSixVertical} from '@phosphor-icons/react'
import {Reorder} from 'motion/react'
import {Fragment} from 'react'

export function ReorderItem<T>({value, getProperties}: ReorderItemProps<T>) {
    return (
        <Reorder.Item
            value={value}
            className="grid w-full cursor-grab grid-cols-[auto,auto,1fr] items-center gap-x-1.5 rounded-md bg-layer-1 px-1.5 ring-1 ring-line transition-shadow hover:ring-2 hover:ring-accent active:cursor-grabbing dark:bg-layer-1-dark dark:ring-line-dark dark:hover:ring-accent-dark"
        >
            <div className="py-1.5">
                <DotsSixVertical weight="bold" size={16} />
            </div>

            <div className="h-full w-px bg-line dark:bg-line-dark" />

            <div className="grid grid-cols-2 px-1.5 py-2.5 text-sm font-medium">
                {getProperties(value).map(({label, value}) => (
                    <Fragment key={label}>
                        <p className="line-clamp-2 w-full text-left text-g-500">{label}</p>
                        <p className="line-clamp-2 w-full text-right">{value || <span className="text-g-500">-</span>}</p>
                    </Fragment>
                ))}
            </div>
        </Reorder.Item>
    )
}
