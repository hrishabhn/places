'use client'

import {MagnifyingGlassIcon, XIcon} from '@phosphor-icons/react'

import {Button} from '@/components/ui'

function Container({children}: {children?: React.ReactNode}) {
    return <div className="rounded-xl bg-layer-1 px-3 py-2 ring-1 ring-line dark:bg-layer-1-dark dark:ring-line-dark">{children}</div>
}

type SearchBarFilterProps = {
    query: string
    setQuery: (query: string) => void
    resultCount?: number
}

export function SearchBarFilter({query, setQuery, resultCount}: SearchBarFilterProps) {
    return (
        <div className="grid grid-cols-[1fr_auto] gap-3">
            <Container>
                <div className="grid size-full auto-cols-auto grid-flow-col grid-cols-[auto_1fr] items-center gap-2">
                    <MagnifyingGlassIcon weight="bold" />
                    <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search" className="w-full text-balance bg-transparent outline-none" />
                    {query.length > 0 && (
                        <button type="button" onClick={() => setQuery('')} className="active:opacity-60">
                            <XIcon weight="bold" />
                        </button>
                    )}
                </div>
            </Container>
            {resultCount ? (
                <Container>
                    <div className="flex size-full items-center justify-center text-sm font-medium text-g-500">
                        <p className="">{`${resultCount} results`}</p>
                    </div>
                </Container>
            ) : null}
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
