'use client'

import {TableColumn} from '../layout'
import {type TableInputProps, tableInputClass} from './shared'

import {Combobox, ComboboxInput} from '@headlessui/react'
import {useState} from 'react'

import {type ComboboxReducers, StyledComboboxOptions} from '@/components/shared'

type TableComboboxInputProps<T> = {
    options: T[] | readonly T[]
} & TableInputProps<T | null> &
    ComboboxReducers<T>

export function TableComboboxInput<T>({options, size, defaultValue, value, setValue, getTitle, getId, getKeywords}: TableComboboxInputProps<T>) {
    const [query, setQuery] = useState('')

    return (
        <TableColumn size={size}>
            <Combobox immediate defaultValue={defaultValue} value={value} onChange={setValue} onClose={() => setQuery('')}>
                <ComboboxInput<T> className={tableInputClass} displayValue={value => (value ? getTitle(value) : '')} onChange={e => setQuery(e.target.value)} />
                <StyledComboboxOptions query={query} options={options} getTitle={getTitle} getId={getId} getKeywords={getKeywords} />
            </Combobox>
        </TableColumn>
    )
}
