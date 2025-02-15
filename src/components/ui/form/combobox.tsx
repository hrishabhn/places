'use client'

import {TextInputContainer} from './text'

import {Combobox, ComboboxInput} from '@headlessui/react'
import {CaretDown} from '@phosphor-icons/react'
import {useState} from 'react'

import {type ComboboxReducers, type InputProps, StyledComboboxOptions} from '@/components/shared'

type DropdownComboboxProps<T> = {
    placeholder?: string
    name?: string
    options: T[] | readonly T[]
} & InputProps<T | null> &
    ComboboxReducers<T>

export function DropdownCombobox<T>({
    placeholder,
    name,

    defaultValue,
    value,
    setValue,
    options,

    getTitle,
    getId,
    getKeywords,
}: DropdownComboboxProps<T>) {
    const [query, setQuery] = useState<string>('')

    return (
        <Combobox immediate name={name} defaultValue={defaultValue} value={value} onChange={setValue} onClose={() => setQuery('')}>
            <TextInputContainer icon={CaretDown}>
                <ComboboxInput<T>
                    placeholder={placeholder}
                    className="-ml-9 flex-1 bg-transparent py-2 pl-9 outline-none disabled:text-g-500"
                    displayValue={value => (value ? getTitle(value) : '')}
                    onChange={e => setQuery(e.target.value)}
                />
            </TextInputContainer>

            <StyledComboboxOptions query={query} options={options} getTitle={getTitle} getId={getId} getKeywords={getKeywords} />
        </Combobox>
    )
}
