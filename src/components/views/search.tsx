'use client'

import {MagnifyingGlass as MagnifyingGlassIcon, X as XIcon} from '@phosphor-icons/react'

import {Button} from '@/components/ui'

type SearchBarFilterProps = {
    query: string
    setQuery: (query: string) => void
}

export function SearchBarFilter({query, setQuery}: SearchBarFilterProps) {
    return (
        <div className="flex w-full items-center gap-2 rounded-xl bg-layer-1 px-3 py-2 ring-1 ring-line sm:max-w-96 dark:bg-layer-1-dark dark:ring-line-dark">
            <MagnifyingGlassIcon weight="bold" className="shrink-0" />
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search" className="grow bg-transparent outline-none" />
            {query.length > 0 && (
                <button type="button" onClick={() => setQuery('')} className="shrink-0 active:opacity-60">
                    <XIcon weight="bold" />
                </button>
            )}
        </div>
    )
}

export function SearchBarButton({active = false, children}: {active?: boolean; children?: React.ReactNode}) {
    return (
        <Button ring={!active} rounded="xl" theme={active ? 'accent' : 'layer-1'}>
            {children}
        </Button>
    )
}
