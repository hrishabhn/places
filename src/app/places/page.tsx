'use client'

import {Check, City, Flag, ForkKnife, MagnifyingGlass, MapPin, MapTrifold, QuestionMark, Star, Tag, X} from '@phosphor-icons/react'
import {useQuery, useSuspenseQuery} from '@tanstack/react-query'
import {parseAsBoolean, parseAsString, useQueryState} from 'nuqs'
import {Suspense, useEffect, useRef} from 'react'
import {useClickAway, useKey} from 'react-use'

import {CityImage} from '@/app/views/city/image'
import {PlaceCard} from '@/app/views/place/card'

import {type Place} from '@/server/types'

import {countryFlag} from '@/model/util'

import {useArrayState} from '@/lib/hooks/array-state'
import {useTRPC} from '@/lib/trpc'

import {Heading, inter} from '@/components/layout'
import {Badge, IconButton} from '@/components/ui'
import {type ActiveFilter, FilterBar, InfoBar} from '@/components/views/filter'
import {GridStack} from '@/components/views/grid'
import {Loading} from '@/components/views/loading'
import {MapView} from '@/components/views/map'
import {MenuBarItem, MenuBarSelect, MenuBarTray} from '@/components/views/menu-bar'
import {Section} from '@/components/views/section'

export default function PlacesPage() {
    // state
    const [top, setTop] = useQueryState('top', parseAsBoolean.withDefault(false))
    const selectedCountrySlug = useArrayState('country')
    const selectedCitySlug = useArrayState('city')
    const selectedPlaceType = useArrayState('type')
    const selectedPlaceTag = useArrayState('tag')

    // query
    const trpc = useTRPC()
    const {data: allCountry} = useSuspenseQuery(trpc.GetAllCountry.queryOptions({sort: 'place_count'}))
    const {data: allCity} = useSuspenseQuery(trpc.GetAllCity.queryOptions({sort: 'place_count'}))
    const {data: allPlaceType} = useSuspenseQuery(trpc.GetAllPlaceType.queryOptions())
    const {data: allPlaceTag} = useSuspenseQuery(trpc.GetAllPlaceTag.queryOptions())

    // single city for image
    const singleCity = (() => {
        if (selectedCountrySlug.value.length > 0) return undefined
        if (selectedCitySlug.value.length === 1) return allCity.find(city => city.slug === selectedCitySlug.value[0])
    })()

    // active filter
    const activeFilter: ActiveFilter[] = [
        ...selectedCountrySlug.value.map(countrySlug => ({
            title: allCountry.find(country => country.slug === countrySlug)?.name || countrySlug,
            onRemove: () => selectedCountrySlug.remove(countrySlug),
        })),
        ...selectedCitySlug.value.map(citySlug => ({
            title: allCity.find(city => city.slug === citySlug)?.name || citySlug,
            onRemove: () => selectedCitySlug.remove(citySlug),
        })),
        ...selectedPlaceType.value.map(placeType => ({
            title: placeType,
            onRemove: () => selectedPlaceType.remove(placeType),
        })),
        ...selectedPlaceTag.value.map(placeTag => ({
            title: placeTag,
            onRemove: () => selectedPlaceTag.remove(placeTag),
        })),
    ]

    return (
        <>
            {singleCity && <CityImage city={singleCity} />}

            <MenuBarTray>
                <button className="active:opacity-60" onClick={() => setTop(!top)}>
                    <MenuBarItem active={top}>
                        <Star weight="fill" />
                        <p>Top</p>
                    </MenuBarItem>
                </button>
                <MenuBarSelect
                    icon={Flag}
                    placeholder="Country"
                    allItem={allCountry}
                    onSelect={country => selectedCountrySlug.toggle(country.slug)}
                    isActive={country => selectedCountrySlug.value.includes(country.slug)}
                    toId={country => country.slug}
                    toImage={country => ({imageURL: countryFlag(country.slug)})}
                    toTitle={country => country.name}
                    toSubtitle={country => `${country.place_count} places`}
                />
                <MenuBarSelect
                    icon={City}
                    placeholder="City"
                    allItem={allCity}
                    onSelect={city => selectedCitySlug.toggle(city.slug)}
                    isActive={city => selectedCitySlug.value.includes(city.slug)}
                    toId={city => city.slug}
                    toImage={country => ({imageURL: countryFlag(country.slug)})}
                    toTitle={city => city.name}
                    toSubtitle={city => `${city.place_count} places`}
                />
                <MenuBarSelect
                    icon={ForkKnife}
                    placeholder="Type"
                    allItem={allPlaceType}
                    onSelect={placeType => selectedPlaceType.toggle(placeType.type_name)}
                    isActive={placeType => selectedPlaceType.value.includes(placeType.type_name)}
                    toId={placeType => placeType.type_name}
                    toTitle={placeType => placeType.type_name}
                    toSubtitle={placeType => `${placeType.place_count} places`}
                />
                <MenuBarSelect
                    icon={Tag}
                    placeholder="Tag"
                    allItem={allPlaceTag}
                    onSelect={placeTag => selectedPlaceTag.toggle(placeTag.tag_name)}
                    isActive={placeTag => selectedPlaceTag.value.includes(placeTag.tag_name)}
                    toId={placeTag => placeTag.tag_name}
                    toTitle={placeTag => placeTag.tag_name}
                    toSubtitle={placeTag => `${placeTag.place_count} places`}
                />
            </MenuBarTray>

            {activeFilter.length > 0 && (
                <FilterBar>
                    {activeFilter.map(filter => (
                        <button key={filter.title} className="active:opacity-60" onClick={() => filter.onRemove()}>
                            <Badge>
                                <X weight="bold" />
                                <p>{filter.title}</p>
                            </Badge>
                        </button>
                    ))}
                </FilterBar>
            )}

            <Section>
                <Suspense fallback={<Loading />}>
                    <PlacesStack
                        filter={{
                            top,
                            countrySlug: selectedCountrySlug.value,
                            citySlug: selectedCitySlug.value,
                            placeType: selectedPlaceType.value,
                            placeTag: selectedPlaceTag.value,
                        }}
                    />
                </Suspense>
            </Section>
        </>
    )
}

type PlacesStackProps = {
    filter: {
        top: boolean
        countrySlug: string[]
        citySlug: string[]
        placeType: string[]
        placeTag: string[]
    }
}

function PlacesStack({filter}: PlacesStackProps) {
    const trpc = useTRPC()
    const {data: allPlace} = useSuspenseQuery(trpc.GetAllPlace.queryOptions({filter}))

    return (
        <>
            <PlacesInfo allPlace={allPlace} />
            {allPlace.length === 0 ? (
                <div className="py-3">
                    <Heading size="h3" withoutPadding>
                        No results
                    </Heading>
                    <Heading size="h5" withoutPadding>
                        Try adjusting the filters
                    </Heading>
                </div>
            ) : (
                <GridStack>
                    {allPlace.map(place => (
                        <PlaceCard key={place.id} place={place} />
                    ))}
                </GridStack>
            )}
        </>
    )
}

function PlacesInfo({allPlace}: {allPlace: Place[]}) {
    // state
    const [showSearch, setShowSearch] = useQueryState('search', parseAsBoolean.withDefault(false))
    const [showMap, setShowMap] = useQueryState('map', parseAsBoolean.withDefault(false))

    // effect
    useKey('/', e => {
        e.preventDefault()
        setShowSearch(true)
    })

    return (
        <>
            <InfoBar>
                <p>{allPlace.length} places</p>
                <div className="grow" />
                <button className="active:opacity-60" onClick={() => setShowSearch(!showSearch)}>
                    <IconButton theme="hover" icon={MagnifyingGlass} active={showSearch} />
                </button>
                <button className="active:opacity-60" onClick={() => setShowMap(!showMap)}>
                    <IconButton theme="hover" icon={MapTrifold} active={showMap} />
                </button>
            </InfoBar>

            <PlacesSearch show={showSearch} onHide={() => setShowSearch(false)} />
            <PlacesMap allPlace={allPlace} show={showMap} />
        </>
    )
}

function PlacesSearch({show, onHide}: {show: boolean; onHide: () => void}) {
    const selectedCountrySlug = useArrayState('country')
    const selectedCitySlug = useArrayState('city')
    const selectedPlaceType = useArrayState('type')
    const selectedPlaceTag = useArrayState('tag')

    // ref
    const dialogRef = useRef<HTMLDialogElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // state
    const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''))

    // effect
    useEffect(() => {
        if (show) inputRef.current?.focus()
    }, [show])
    useClickAway(dialogRef, onHide)
    useKey('Escape', e => {
        if (show) {
            e.preventDefault()
            if (query) setQuery('')
            else onHide()
        }
    })

    // query
    const trpc = useTRPC()
    const {status, data} = useQuery(trpc.Search.queryOptions({query}))

    return (
        <dialog
            ref={dialogRef}
            open={show}
            className={`${inter.className} fixed top-0 z-10 size-full flex-col bg-transparent text-inherit sm:top-48 sm:max-h-96 sm:w-[512px] sm:max-w-full`}
        >
            <div className="grid size-full grid-flow-row grid-rows-[auto,1fr] border border-black/10 bg-layer-1/80 font-medium text-inherit shadow-lg backdrop-blur-lg sm:rounded-xl sm:text-sm dark:border-white/10 dark:bg-layer-1-dark/80">
                <div className="flex items-center gap-2 border-b border-black/10 p-1.5 px-3 py-2 dark:border-white/10">
                    <MagnifyingGlass weight="bold" />
                    <input
                        ref={inputRef}
                        type="text"
                        autoFocus={show}
                        placeholder="Search"
                        className="w-full bg-transparent outline-none"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
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
                                        const action = {
                                            place: () => {},
                                            country: () => selectedCountrySlug.toggle(result.id),
                                            city: () => selectedCitySlug.toggle(result.id),
                                            place_type: () => selectedPlaceType.toggle(result.id),
                                            place_tag: () => selectedPlaceTag.toggle(result.id),
                                        }[result.type]

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
                                                className={`flex w-full items-center gap-2 rounded-md px-1.5 py-2 active:bg-black/10 dark:active:bg-white/10 ${active ? 'bg-black/5 dark:bg-white/5' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                                            >
                                                <Icon weight="duotone" />
                                                <p className="line-clamp-1">{result.name}</p>
                                                <div className="grow" />
                                                <p className="line-clamp-1 text-xs opacity-50">{subtitle}</p>
                                                {active && <Check weight="bold" className="opacity-50" />}
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

function PlacesMap({allPlace, show}: {allPlace: Place[]; show: boolean}) {
    if (!show) return null
    return (
        <div className="mb-4 aspect-square max-h-96 w-full overflow-hidden rounded-md ring-1 ring-line sm:aspect-video dark:ring-line-dark">
            <MapView allPlace={allPlace} />
        </div>
    )
}
