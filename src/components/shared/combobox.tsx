'use client'

import {ComboboxOption, ComboboxOptions} from '@headlessui/react'

import {findDuplicates} from '@/lib/array'
import {type Keyword, searchKeywords} from '@/lib/search'

import {type DropdownAnchor, DropdownItem, DropdownTransition} from '@/components/ui'

export type ComboboxReducers<T> = {
    getTitle: (value: T) => string
    getId: (value: T) => string
    getKeywords: (value: T) => Keyword[]
}

export const stringComboboxReducers: ComboboxReducers<string> = {
    getTitle: (value: string) => value,
    getId: (value: string) => value,
    getKeywords: (value: string) => [value],
}

type StyledTextComboboxOptionsProps<T> = {
    anchor?: DropdownAnchor
    query: string
    options: T[] | readonly T[]
}

type StyledComboboxOptionsProps<T> = StyledTextComboboxOptionsProps<T> & ComboboxReducers<T>

export function StyledComboboxOptions<T>({
    anchor = 'bottom start',
    query,
    options,

    getTitle,
    getId,
    getKeywords,
}: StyledComboboxOptionsProps<T>) {
    const duplicate = findDuplicates(options.map(getId))
    if (duplicate) throw new Error(`Duplicate found in StyledComboboxOptions: ${duplicate}. Dropdown will not work correctly.`)

    const displayOptions = options.filter(option => searchKeywords({query, keywords: getKeywords(option)}))

    return (
        <DropdownTransition>
            <ComboboxOptions
                anchor={{
                    to: anchor,
                    gap: 8,
                }}
                className="z-50 origin-top rounded-lg bg-layer-1 shadow-md ring-1 ring-line transition dark:bg-layer-1-dark dark:ring-line-dark"
            >
                <div className="max-h-96 w-64 overflow-y-scroll py-1">
                    {query.length === 0 ? (
                        <ComboboxOption value={null}>{({focus, selected}) => <DropdownItem title="None" active={selected} focus={focus} disabled />}</ComboboxOption>
                    ) : null}

                    {displayOptions.length > 0 ? (
                        displayOptions.map(option => (
                            <ComboboxOption key={getId(option)} value={option}>
                                {({focus, selected}) => <DropdownItem title={getTitle(option)} active={selected} focus={focus} />}
                            </ComboboxOption>
                        ))
                    ) : (
                        <DropdownItem title="No matches" disabled />
                    )}
                </div>
            </ComboboxOptions>
        </DropdownTransition>
    )
}
