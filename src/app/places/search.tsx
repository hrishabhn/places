'use client'

import {CheckCircle, City, Flag, ForkKnife, MagnifyingGlass, MapPin, QuestionMark, Tag, X} from '@phosphor-icons/react'
import {useQuery} from '@tanstack/react-query'
import {parseAsString, useQueryState} from 'nuqs'
import {useEffect, useRef, useState} from 'react'
import {useClickAway} from 'react-use'

import {type SearchResult} from '@/server/types'

import {useArrayState, useStringState} from '@/lib/hooks/nuqs'
import {useTRPC} from '@/lib/trpc'

import {Heading, inter} from '@/components/layout'

export function PlacesSearch({show, onHide}: {show: boolean; onHide: () => void}) {
    const selectedPlaceId = useStringState('id')
    const selectedCountrySlug = useArrayState('country')
    const selectedCitySlug = useArrayState('city')
    const selectedPlaceType = useArrayState('type')
    const selectedPlaceTag = useArrayState('tag')

    function getResultAction(result: SearchResult): () => void {
        return {
            place: () => selectedPlaceId.set(result.id),
            country: () => selectedCountrySlug.toggle(result.id),
            city: () => selectedCitySlug.toggle(result.id),
            place_type: () => selectedPlaceType.toggle(result.id),
            place_tag: () => selectedPlaceTag.toggle(result.id),
        }[result.type]
    }

    // ref
    const dialogRef = useRef<HTMLDialogElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // state
    const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''))
    const [focusIndex, setFocusIndex] = useState<number>(0)
    useEffect(() => {
        setFocusIndex(0)
    }, [query])

    // effect
    useEffect(() => {
        if (show) inputRef.current?.focus()
    }, [show])
    useClickAway(dialogRef, onHide)

    // query
    const trpc = useTRPC()
    const {status, data} = useQuery(trpc.Search.queryOptions({query}))

    return (
        <dialog
            ref={dialogRef}
            open={show}
            className={`${inter.className} fixed top-0 z-10 size-full flex-col bg-transparent text-inherit sm:top-48 sm:max-h-96 sm:w-[512px] sm:max-w-full`}
        >
            <div className="grid size-full grid-flow-row grid-rows-[auto,1fr] border-black/10 bg-layer-1/80 font-medium text-inherit shadow-lg backdrop-blur-lg sm:rounded-xl sm:border sm:text-sm dark:border-white/10 dark:bg-layer-1-dark/80">
                <div className="flex items-center gap-2 border-b border-black/10 p-3 text-base dark:border-white/10">
                    <MagnifyingGlass weight="bold" />
                    <input
                        ref={inputRef}
                        type="text"
                        autoFocus={show}
                        placeholder="Search"
                        className="w-full bg-transparent outline-none"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={e => {
                            if (show) {
                                if (e.key === 'Escape') {
                                    e.preventDefault()
                                    if (query) setQuery('')
                                    else onHide()
                                } else if (e.key === 'Enter') {
                                    const result = data?.at(focusIndex)
                                    if (result) {
                                        e.preventDefault()
                                        setQuery('')
                                        onHide()
                                        const action = getResultAction(result)
                                        action()
                                    }
                                } else if (e.key === 'ArrowDown') {
                                    e.preventDefault()
                                    if (data) setFocusIndex(Math.min(focusIndex + 1, data.length - 1))
                                } else if (e.key === 'ArrowUp') {
                                    e.preventDefault()
                                    if (data) setFocusIndex(Math.max(focusIndex - 1, 0))
                                }
                            }
                        }}
                    />
                    <button
                        onClick={() => {
                            setQuery('')
                            onHide()
                        }}
                        className="active:opacity-60"
                    >
                        <X weight="bold" />
                    </button>
                </div>
                <div className="size-full overflow-y-auto p-1.5">
                    {query ? (
                        <>
                            {status === 'pending' ? (
                                <SearchState state="pending" />
                            ) : data?.length ? (
                                <>
                                    {data.map((result, i) => {
                                        const action = getResultAction(result)

                                        const active = {
                                            place: false,
                                            country: selectedCountrySlug.value.includes(result.id),
                                            city: selectedCitySlug.value.includes(result.id),
                                            place_type: selectedPlaceType.value.includes(result.id),
                                            place_tag: selectedPlaceTag.value.includes(result.id),
                                        }[result.type]

                                        const Icon = {
                                            place: MapPin,
                                            country: Flag,
                                            city: City,
                                            place_type: ForkKnife,
                                            place_tag: Tag,
                                        }[result.type]

                                        const subtitle = {
                                            place: 'Place',
                                            country: 'Country',
                                            city: 'City',
                                            place_type: 'Type',
                                            place_tag: 'Tag',
                                        }[result.type]

                                        return (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    setQuery('')
                                                    onHide()
                                                    action()
                                                }}
                                                onMouseEnter={() => setFocusIndex(i)}
                                                className={`flex w-full items-center gap-2 rounded-md px-1.5 py-2 active:bg-black/10 dark:active:bg-white/10 ${focusIndex === i ? 'bg-black/5 dark:bg-white/5' : ''}`}
                                            >
                                                <Icon weight="duotone" />
                                                <p className="line-clamp-1">{result.name}</p>
                                                <div className="grow" />
                                                <p className="line-clamp-1 text-xs opacity-50">{subtitle}</p>
                                                {active && <CheckCircle weight="duotone" className="text-accent" />}
                                            </button>
                                        )
                                    })}
                                </>
                            ) : (
                                <SearchState state="none" />
                            )}
                        </>
                    ) : (
                        <SearchState state="idle" />
                    )}
                </div>
            </div>
        </dialog>
    )
}

function SearchState({state}: {state: 'idle' | 'pending' | 'none'}) {
    if (state === 'pending') return null
    function Icon() {
        switch (state) {
            case 'idle':
                return <MagnifyingGlass weight="duotone" size={32} />
            // case 'pending':
            //     return <Spinner weight="bold" size={16} className="animate-spin" />
            case 'none':
                return <QuestionMark weight="bold" size={32} />
        }
    }

    const message = {
        idle: 'Search for a place',
        // pending: 'Searching',
        none: 'No results found',
    }[state]

    return (
        <div className="flex size-full flex-col items-center justify-center gap-4">
            <Icon />
            <Heading size="h6" withoutPadding>
                {message}
            </Heading>
        </div>
    )
}
