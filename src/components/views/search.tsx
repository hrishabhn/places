'use client'

import {MagnifyingGlassIcon, XIcon} from '@phosphor-icons/react'

import {HLine} from '@/components/views/h-line'
import {Section} from '@/components/views/section'

function Container({children}: {children?: React.ReactNode}) {
    return (
        <div className="grid size-full grid-rows-[auto_1fr] gap-2">
            <HLine />
            {children}
        </div>
    )
}

type SearchBarFilterProps = {
    query: string
    setQuery: (query: string) => void
    resultCount?: number
}

export function SearchBarFilter({query, setQuery, resultCount}: SearchBarFilterProps) {
    return (
        <Section>
            <div className="grid grid-cols-[1fr_auto] gap-3">
                <Container>
                    <div className="grid size-full auto-cols-auto grid-flow-col grid-cols-[auto_1fr] items-center gap-2">
                        <MagnifyingGlassIcon weight="bold" />
                        <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search"
                            className="w-full bg-transparent text-base font-medium text-balance outline-hidden placeholder:text-g-500"
                        />
                        {query.length > 0 && (
                            <button type="button" onClick={() => setQuery('')} className="active:opacity-60">
                                <XIcon weight="bold" />
                            </button>
                        )}
                    </div>
                </Container>
                {resultCount ? (
                    <Container>
                        <p className="flex size-full items-center justify-center text-sm font-medium text-g-500">{resultCount}</p>
                    </Container>
                ) : null}
            </div>
        </Section>
    )
}
