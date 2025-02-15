'use client'

import {TableColumn} from '../layout'
import {type TableInputProps, tableInputClass} from './shared'

import {type ChangeEventHandler} from 'react'

import {inputDebounce} from '@/lib/debounce'

type TableNumberInputProps = {
    debounce?: boolean
} & TableInputProps<number>

export function TableNumberInput({debounce = false, size, defaultValue, value, setValue}: TableNumberInputProps) {
    const onChange: ChangeEventHandler<HTMLInputElement> | undefined = (() => {
        if (setValue === undefined) return undefined
        const eventHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => setValue(Number(e.target.value))
        return debounce ? inputDebounce(eventHandler) : eventHandler
    })()

    return (
        <TableColumn size={size}>
            <input
                //
                type="number"
                defaultValue={defaultValue || ''}
                value={value}
                onChange={onChange}
                className={tableInputClass}
                onWheel={e => e.currentTarget.blur()}
            />
        </TableColumn>
    )
}
