'use client'

import {type Icon, MagnifyingGlass} from '@phosphor-icons/react'

export function SearchBar({children}: {children?: React.ReactNode}) {
    return <div className="flex w-full flex-wrap items-center gap-2 pb-4 pt-8">{children}</div>
}

type SearchBarFilterProps = {
    query: string
    setQuery: (query: string) => void
}

export function SearchBarFilter({query, setQuery}: SearchBarFilterProps) {
    return (
        <div className="flex w-full items-center gap-2 rounded-xl bg-layer-1 px-3 py-2 ring-1 ring-line sm:max-w-96 dark:bg-layer-1-dark dark:ring-line-dark">
            <MagnifyingGlass weight="bold" className="shrink-0" />
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search" className="grow bg-transparent outline-none" />
        </div>
    )
}

type SearchBarButtonProps = {
    icon?: Icon
    text: string

    active?: boolean
}

export function SearchBarButton({icon, text, active = false}: SearchBarButtonProps) {
    const Icon = icon
    return (
        <div
            className={`flex items-center gap-2 rounded-xl px-3 py-2 font-medium ${active ? 'bg-accent text-white dark:bg-accent-dark' : 'bg-layer-1 ring-1 ring-line dark:bg-layer-1-dark dark:ring-line-dark'}`}
        >
            {Icon && <Icon weight="bold" className="shrink-0" />}
            <p className="">{text}</p>
        </div>
    )
}
