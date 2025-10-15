'use client'

import {PlacesMapModal} from './map'
import {SingleCity} from './single-city'

import {
    ArrowsDownUpIcon,
    CardsThreeIcon,
    CityIcon,
    FlagIcon,
    ForkKnifeIcon,
    HeartIcon,
    type Icon,
    MapTrifoldIcon,
    PlusIcon,
    StarIcon,
    TableIcon,
    TagIcon,
    TextTIcon,
    XIcon,
} from '@phosphor-icons/react'
import {keepPreviousData, useQuery, useQueryClient, useSuspenseQuery} from '@tanstack/react-query'
import {parseAsBoolean, parseAsString, parseAsStringLiteral, useQueryState} from 'nuqs'
import {useEffect} from 'react'

import {PlaceCard} from '@/app/views/place/card'
import {getPlaceIcon} from '@/app/views/place/place-icon'
import {PlaceTable} from '@/app/views/place/table'

import {type City, type Country, type Place, type PlaceTag, type PlaceType} from '@/server/types'

import {useBookmarks} from '@/model/bookmarks'
import {countryFlag} from '@/model/util'

import {useArrayState} from '@/lib/hooks/nuqs'
import {useTRPC} from '@/lib/trpc'

import {type ActiveFilter} from '@/components/views/filter'
import {getIcon} from '@/components/views/get-icon'
import {GridStack} from '@/components/views/grid'
import {MenuBarItem, MenuBarSelect, MenuBarTray} from '@/components/views/menu-bar'
import {NoResults} from '@/components/views/no-results'
import {SearchBarFilter} from '@/components/views/search'
import {Section} from '@/components/views/section'
import {PageStack} from '@/components/views/stack'
import {LoadingView} from '@/components/views/state'

const allSort = ['name', 'country', 'city'] as const
type Sort = (typeof allSort)[number]

const sortTitle: Record<Sort, string> = {
    name: 'Name',
    country: 'Country',
    city: 'City',
}

const sortIcon: Record<Sort, Icon> = {
    name: TextTIcon,
    country: FlagIcon,
    city: CityIcon,
}

const allView = ['list', 'table'] as const
type View = (typeof allView)[number]

const viewTitle: Record<View, string> = {
    list: 'List',
    table: 'Table',
}

const viewIcon: Record<View, Icon> = {
    list: CardsThreeIcon,
    table: TableIcon,
}

export default function PlacesPage() {
    // state
    const [showBookmarks, setShowBookmarks] = useQueryState('bookmarks', parseAsBoolean.withDefault(false))
    const [top, setTop] = useQueryState('top', parseAsBoolean.withDefault(false))
    const selectedCountrySlug = useArrayState('country')
    const selectedCitySlug = useArrayState('city')
    const selectedPlaceType = useArrayState('type')
    const selectedPlaceTag = useArrayState('tag')

    const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''))

    const [selectedSort, setSelectedSort] = useQueryState('sort', parseAsStringLiteral(allSort).withDefault(allSort[0]))
    const [selectedView, setSelectedView] = useQueryState('view', parseAsStringLiteral(allView).withDefault(allView[0]))

    const [showMap, setShowMap] = useQueryState('map', parseAsBoolean.withDefault(false))

    // query
    const trpc = useTRPC()
    const queryClient = useQueryClient()

    const {bookmarks} = useBookmarks()

    useEffect(() => {
        if (bookmarks.length === 0) setShowBookmarks(false)
    }, [bookmarks.length, setShowBookmarks])

    const {data: allCountry} = useSuspenseQuery(trpc.GetAllCountry.queryOptions({sort: 'place_count'}))
    const {data: allCity} = useSuspenseQuery(trpc.GetAllCity.queryOptions({sort: 'place_count'}))
    const {data: allPlaceType} = useSuspenseQuery(trpc.GetAllPlaceType.queryOptions())
    const {data: allPlaceTag} = useSuspenseQuery(trpc.GetAllPlaceTag.queryOptions())

    const {status: searchStatus, data: searchResult} = useQuery(trpc.SearchPlaceFilter.queryOptions({query}))
    const {status: allPlaceStatus, data: allPlace} = useQuery(
        trpc.GetAllPlace.queryOptions(
            {
                filter: {
                    id: showBookmarks ? bookmarks : undefined,
                    top,
                    countrySlug: selectedCountrySlug.value,
                    citySlug: selectedCitySlug.value,
                    placeType: selectedPlaceType.value,
                    placeTag: selectedPlaceTag.value,
                },
                query,
                sort: selectedSort,
            },
            {
                placeholderData: keepPreviousData,
            }
        )
    )

    // derived state
    const isPending = searchStatus === 'pending' || allPlaceStatus === 'pending'
    const isError = searchStatus === 'error' || allPlaceStatus === 'error'

    if (isError) throw new Error('Failed to load data')

    // single city for image
    const singleCity: City | undefined = (() => {
        if (selectedCountrySlug.value.length > 0) return undefined
        if (selectedCitySlug.value.length === 1) return allCity.find(city => city.slug === selectedCitySlug.value[0])
    })()

    // active filter
    const activeFilter: ActiveFilter[] = [
        ...selectedCountrySlug.value.map(countrySlug => {
            queryClient.prefetchQuery(
                trpc.GetAllPlace.queryOptions({
                    filter: {
                        id: showBookmarks ? bookmarks : undefined,
                        top,
                        countrySlug: selectedCountrySlug.getToggledValue(countrySlug),
                        citySlug: selectedCitySlug.value,
                        placeType: selectedPlaceType.value,
                        placeTag: selectedPlaceTag.value,
                    },
                    query,
                    sort: selectedSort,
                })
            )

            return {
                title: allCountry.find(country => country.slug === countrySlug)?.name || countrySlug,
                type: 'country' as const,
                onRemove: () => selectedCountrySlug.remove(countrySlug),
            }
        }),
        ...selectedCitySlug.value.map(citySlug => {
            queryClient.prefetchQuery(
                trpc.GetAllPlace.queryOptions({
                    filter: {
                        id: showBookmarks ? bookmarks : undefined,
                        top,
                        countrySlug: selectedCountrySlug.value,
                        citySlug: selectedCitySlug.getToggledValue(citySlug),
                        placeType: selectedPlaceType.value,
                        placeTag: selectedPlaceTag.value,
                    },
                    query,
                    sort: selectedSort,
                })
            )

            return {
                title: allCity.find(city => city.slug === citySlug)?.name || citySlug,
                type: 'city' as const,
                onRemove: () => selectedCitySlug.remove(citySlug),
            }
        }),
        ...selectedPlaceType.value.map(placeType => {
            queryClient.prefetchQuery(
                trpc.GetAllPlace.queryOptions({
                    filter: {
                        id: showBookmarks ? bookmarks : undefined,
                        top,
                        countrySlug: selectedCountrySlug.value,
                        citySlug: selectedCitySlug.value,
                        placeType: selectedPlaceType.getToggledValue(placeType),
                        placeTag: selectedPlaceTag.value,
                    },
                    query,
                    sort: selectedSort,
                })
            )

            return {
                title: placeType,
                type: 'place_type' as const,
                onRemove: () => selectedPlaceType.remove(placeType),
            }
        }),
        ...selectedPlaceTag.value.map(placeTag => {
            queryClient.prefetchQuery(
                trpc.GetAllPlace.queryOptions({
                    filter: {
                        id: showBookmarks ? bookmarks : undefined,
                        top,
                        countrySlug: selectedCountrySlug.value,
                        citySlug: selectedCitySlug.value,
                        placeType: selectedPlaceType.value,
                        placeTag: selectedPlaceTag.getToggledValue(placeTag),
                    },
                    query,
                    sort: selectedSort,
                })
            )

            return {
                title: placeTag,
                type: 'place_tag' as const,
                onRemove: () => selectedPlaceTag.remove(placeTag),
            }
        }),
    ]

    // prefetch
    queryClient.prefetchQuery(
        trpc.GetAllPlace.queryOptions({
            filter: {
                id: showBookmarks ? undefined : bookmarks,
                top,
                countrySlug: selectedCountrySlug.value,
                citySlug: selectedCitySlug.value,
                placeType: selectedPlaceType.value,
                placeTag: selectedPlaceTag.value,
            },
            query,
            sort: selectedSort,
        })
    )

    queryClient.prefetchQuery(
        trpc.GetAllPlace.queryOptions({
            filter: {
                id: showBookmarks ? bookmarks : undefined,
                top: !top,
                countrySlug: selectedCountrySlug.value,
                citySlug: selectedCitySlug.value,
                placeType: selectedPlaceType.value,
                placeTag: selectedPlaceTag.value,
            },
            query,
            sort: selectedSort,
        })
    )

    return (
        <>
            {singleCity ? <SingleCity city={singleCity} /> : null}
            <PageStack padding>
                <MenuBarTray>
                    {activeFilter.map(filter => {
                        const Icon = getIcon(filter.type)
                        return (
                            <button key={filter.title} onClick={() => filter.onRemove()} className="shrink-0 active:opacity-60">
                                <MenuBarItem active>
                                    <Icon weight="duotone" />
                                    <p>{filter.title}</p>
                                    <XIcon weight="bold" />
                                </MenuBarItem>
                            </button>
                        )
                    })}

                    {bookmarks.length > 0 && (
                        <button onClick={() => setShowBookmarks(!showBookmarks)} className="active:opacity-60">
                            <MenuBarItem active={showBookmarks}>
                                <HeartIcon weight="fill" />
                                <p>Bookmarks</p>
                            </MenuBarItem>
                        </button>
                    )}
                    <button onClick={() => setTop(!top)} className="active:opacity-60">
                        <MenuBarItem active={top}>
                            <StarIcon weight="fill" />
                            <p>Top</p>
                        </MenuBarItem>
                    </button>
                    <MenuBarSelect<Country>
                        icon={FlagIcon}
                        text="Country"
                        active={selectedCountrySlug.value.length > 0}
                        allItem={allCountry}
                        onSelect={country => selectedCountrySlug.toggle(country.slug)}
                        isActive={country => selectedCountrySlug.value.includes(country.slug)}
                        toId={country => country.slug}
                        toImage={country => ({imageURL: countryFlag(country.code)})}
                        toTitle={country => country.name}
                        toSubtitle={country => `${country.place_count} places`}
                        onScreen={country =>
                            queryClient.prefetchQuery(
                                trpc.GetAllPlace.queryOptions({
                                    filter: {
                                        id: showBookmarks ? bookmarks : undefined,
                                        top,
                                        countrySlug: selectedCountrySlug.getToggledValue(country.slug),
                                        citySlug: selectedCitySlug.value,
                                        placeType: selectedPlaceType.value,
                                        placeTag: selectedPlaceTag.value,
                                    },
                                    query,
                                    sort: selectedSort,
                                })
                            )
                        }
                    />
                    <MenuBarSelect<City>
                        icon={CityIcon}
                        text="City"
                        active={selectedCitySlug.value.length > 0}
                        allItem={allCity}
                        onSelect={city => selectedCitySlug.toggle(city.slug)}
                        isActive={city => selectedCitySlug.value.includes(city.slug)}
                        toId={city => city.slug}
                        toImage={city => ({imageURL: countryFlag(city.country_code)})}
                        toTitle={city => city.name}
                        toSubtitle={city => `${city.place_count} places`}
                        onScreen={city =>
                            queryClient.prefetchQuery(
                                trpc.GetAllPlace.queryOptions({
                                    filter: {
                                        id: showBookmarks ? bookmarks : undefined,
                                        top,
                                        countrySlug: selectedCountrySlug.value,
                                        citySlug: selectedCitySlug.getToggledValue(city.slug),
                                        placeType: selectedPlaceType.value,
                                        placeTag: selectedPlaceTag.value,
                                    },
                                    query,
                                    sort: selectedSort,
                                })
                            )
                        }
                    />
                    <MenuBarSelect<PlaceType>
                        icon={ForkKnifeIcon}
                        text="Type"
                        active={selectedPlaceType.value.length > 0}
                        allItem={allPlaceType}
                        onSelect={placeType => selectedPlaceType.toggle(placeType.type_name)}
                        isActive={placeType => selectedPlaceType.value.includes(placeType.type_name)}
                        toId={placeType => placeType.type_name}
                        toImage={placeType => ({icon: getPlaceIcon(placeType.type_name, {returnDefault: true})})}
                        toTitle={placeType => placeType.type_name}
                        toSubtitle={placeType => `${placeType.place_count} places`}
                        onScreen={placeType =>
                            queryClient.prefetchQuery(
                                trpc.GetAllPlace.queryOptions({
                                    filter: {
                                        id: showBookmarks ? bookmarks : undefined,
                                        top,
                                        countrySlug: selectedCountrySlug.value,
                                        citySlug: selectedCitySlug.value,
                                        placeType: selectedPlaceType.getToggledValue(placeType.type_name),
                                        placeTag: selectedPlaceTag.value,
                                    },
                                    query,
                                    sort: selectedSort,
                                })
                            )
                        }
                    />
                    <MenuBarSelect<PlaceTag>
                        icon={TagIcon}
                        text="Tag"
                        active={selectedPlaceTag.value.length > 0}
                        allItem={allPlaceTag}
                        onSelect={placeTag => selectedPlaceTag.toggle(placeTag.tag_name)}
                        isActive={placeTag => selectedPlaceTag.value.includes(placeTag.tag_name)}
                        toId={placeTag => placeTag.tag_name}
                        toTitle={placeTag => placeTag.tag_name}
                        toSubtitle={placeTag => `${placeTag.place_count} places`}
                        onScreen={placeTag =>
                            queryClient.prefetchQuery(
                                trpc.GetAllPlace.queryOptions({
                                    filter: {
                                        id: showBookmarks ? bookmarks : undefined,
                                        top,
                                        countrySlug: selectedCountrySlug.value,
                                        citySlug: selectedCitySlug.value,
                                        placeType: selectedPlaceType.value,
                                        placeTag: selectedPlaceTag.getToggledValue(placeTag.tag_name),
                                    },
                                    query,
                                    sort: selectedSort,
                                })
                            )
                        }
                    />

                    <div className="grow" />

                    <MenuBarSelect<Sort>
                        icon={ArrowsDownUpIcon}
                        text={sortTitle[selectedSort]}
                        anchor="bottom end"
                        allItem={[...allSort]}
                        onSelect={option => setSelectedSort(option)}
                        isActive={option => option === selectedSort}
                        toId={option => option}
                        toImage={option => ({icon: sortIcon[option]})}
                        toTitle={option => sortTitle[option]}
                        onScreen={sort =>
                            queryClient.prefetchQuery(
                                trpc.GetAllPlace.queryOptions({
                                    filter: {
                                        id: showBookmarks ? bookmarks : undefined,
                                        top,
                                        countrySlug: selectedCountrySlug.value,
                                        citySlug: selectedCitySlug.value,
                                        placeType: selectedPlaceType.value,
                                        placeTag: selectedPlaceTag.value,
                                    },
                                    query,
                                    sort,
                                })
                            )
                        }
                    />
                    <MenuBarSelect<View>
                        icon={CardsThreeIcon}
                        text={viewTitle[selectedView]}
                        anchor="bottom end"
                        allItem={[...allView]}
                        onSelect={view => setSelectedView(view)}
                        isActive={view => view === selectedView}
                        toId={view => view}
                        toImage={view => ({icon: viewIcon[view]})}
                        toTitle={view => viewTitle[view]}
                    />
                </MenuBarTray>

                <SearchBarFilter query={query} setQuery={setQuery} resultCount={allPlace?.length} />

                {isPending ? (
                    <LoadingView />
                ) : (
                    <>
                        {searchResult.length > 0 && (
                            <MenuBarTray>
                                {searchResult.map((result, i) => {
                                    const active = {
                                        country: selectedCountrySlug.value.includes(result.id),
                                        city: selectedCitySlug.value.includes(result.id),
                                        place_type: selectedPlaceType.value.includes(result.id),
                                        place_tag: selectedPlaceTag.value.includes(result.id),
                                    }[result.type]

                                    const onSelect = {
                                        country: () => selectedCountrySlug.toggle(result.id),
                                        city: () => selectedCitySlug.toggle(result.id),
                                        place_type: () => selectedPlaceType.toggle(result.id),
                                        place_tag: () => selectedPlaceTag.toggle(result.id),
                                    }[result.type]

                                    const Icon = getIcon(result.type)

                                    // prefetch
                                    if (result.type === 'country') {
                                        queryClient.prefetchQuery(
                                            trpc.GetAllPlace.queryOptions({
                                                filter: {
                                                    id: showBookmarks ? bookmarks : undefined,
                                                    top,
                                                    countrySlug: selectedCountrySlug.getToggledValue(result.id),
                                                    citySlug: selectedCitySlug.value,
                                                    placeType: selectedPlaceType.value,
                                                    placeTag: selectedPlaceTag.value,
                                                },
                                                query: '',
                                                sort: selectedSort,
                                            })
                                        )
                                    } else if (result.type === 'city') {
                                        queryClient.prefetchQuery(
                                            trpc.GetAllPlace.queryOptions({
                                                filter: {
                                                    id: showBookmarks ? bookmarks : undefined,
                                                    top,
                                                    countrySlug: selectedCountrySlug.value,
                                                    citySlug: selectedCitySlug.getToggledValue(result.id),
                                                    placeType: selectedPlaceType.value,
                                                    placeTag: selectedPlaceTag.value,
                                                },
                                                query: '',
                                                sort: selectedSort,
                                            })
                                        )
                                    } else if (result.type === 'place_type') {
                                        queryClient.prefetchQuery(
                                            trpc.GetAllPlace.queryOptions({
                                                filter: {
                                                    id: showBookmarks ? bookmarks : undefined,
                                                    top,
                                                    countrySlug: selectedCountrySlug.value,
                                                    citySlug: selectedCitySlug.value,
                                                    placeType: selectedPlaceType.getToggledValue(result.id),
                                                    placeTag: selectedPlaceTag.value,
                                                },
                                                query: '',
                                                sort: selectedSort,
                                            })
                                        )
                                    } else if (result.type === 'place_tag') {
                                        queryClient.prefetchQuery(
                                            trpc.GetAllPlace.queryOptions({
                                                filter: {
                                                    id: showBookmarks ? bookmarks : undefined,
                                                    top,
                                                    countrySlug: selectedCountrySlug.value,
                                                    citySlug: selectedCitySlug.value,
                                                    placeType: selectedPlaceType.value,
                                                    placeTag: selectedPlaceTag.getToggledValue(result.id),
                                                },
                                                query: '',
                                                sort: selectedSort,
                                            })
                                        )
                                    }

                                    return (
                                        <button
                                            key={i}
                                            className="active:opacity-60"
                                            onClick={() => {
                                                onSelect()
                                                setQuery('')
                                            }}
                                        >
                                            <MenuBarItem active={active}>
                                                <Icon weight="duotone" />
                                                <p>{result.name}</p>
                                                {active ? <XIcon weight="bold" /> : <PlusIcon weight="bold" />}
                                            </MenuBarItem>
                                        </button>
                                    )
                                })}
                            </MenuBarTray>
                        )}

                        <PlacesStack allPlace={allPlace} view={selectedView} />

                        <PlacesMapModal isOpen={showMap} onClose={() => setShowMap(false)} allPlace={allPlace} />
                    </>
                )}

                <div className="fixed inset-x-0 bottom-4 z-10 mx-auto w-fit">
                    <button
                        onClick={() => setShowMap(!showMap)}
                        className="flex items-center gap-2 rounded-full bg-accent-dark px-3 py-2 text-base font-medium text-accent-light shadow-md"
                    >
                        <MapTrifoldIcon weight="bold" />
                        <p>View on Map</p>
                    </button>
                </div>
            </PageStack>
        </>
    )
}

function PlacesStack({allPlace, view}: {allPlace: Place[]; view: View}) {
    const {bookmarks, toggleBookmark} = useBookmarks()

    if (allPlace.length === 0) return <NoResults title="No places found." subtitle="Try changing your query." />

    switch (view) {
        case 'list':
            return (
                <Section>
                    <GridStack>
                        {allPlace.map(place => (
                            <PlaceCard key={place.id} place={place} />
                        ))}
                    </GridStack>
                </Section>
            )

        case 'table':
            return (
                <div className="w-full overflow-hidden">
                    <Section>
                        <PlaceTable allPlace={allPlace} bookmarks={bookmarks} onToggleBookmark={id => toggleBookmark(id)} />
                    </Section>
                </div>
            )
    }
}
