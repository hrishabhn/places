'use client'

import {TableColumn} from '../layout'
import {type TableInputProps, tableInputClass} from './shared'

import {type ChangeEventHandler} from 'react'

import {inputDebounce} from '@/lib/debounce'

type TableTextInputProps = {
    multiline?: boolean
    debounce?: boolean
} & TableInputProps<string>

export function TableTextInput({multiline, debounce = false, size, defaultValue, value, setValue}: TableTextInputProps) {
    const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined = (() => {
        if (setValue === undefined) return undefined
        const eventHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => setValue(e.target.value.trim())
        return debounce ? inputDebounce(eventHandler) : eventHandler
    })()

    return (
        <TableColumn size={size}>
            <input
                //
                type="text"
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                className={tableInputClass}
            />
        </TableColumn>
    )
}
