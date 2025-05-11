'use client'

import {PlacesMap} from './map'
import {PlacesStats} from './stats'

import {ChartLineUp, City, Flag, ForkKnife, Heart, MapTrifold, Plus, Star, Table, Tag, TextT, X} from '@phosphor-icons/react'
import {useQuery, useQueryClient, useSuspenseQuery} from '@tanstack/react-query'
import {getCookie, setCookie} from 'cookies-next'
import {parseAsString, parseAsStringLiteral, useQueryState} from 'nuqs'

import {CityImage} from '@/app/views/city/image'
import {PlaceCard} from '@/app/views/place/card'
import {PlaceTable} from '@/app/views/place/table'

import {BookmarksSchema} from '@/model/bookmarks'
import {countryFlag} from '@/model/util'

import {useArrayState, useBooleanState} from '@/lib/hooks/nuqs'
import {useTRPC} from '@/lib/trpc'

import {Badge, ButtonTray} from '@/components/ui'
import {type ActiveFilter} from '@/components/views/filter'
import {getIcon} from '@/components/views/get-icon'
import {GridStack} from '@/components/views/grid'
import {Loading} from '@/components/views/loading'
import {MenuBarItem, MenuBarSelect, MenuBarSort, MenuBarTray} from '@/components/views/menu-bar'
import {SearchBarButton, SearchBarFilter} from '@/components/views/search'
import {Section, SectionHeader} from '@/components/views/section'

const allSort = ['name', 'country', 'city'] as const

export default function PlacesPage() {
    // state
    const showBookmarks = useBooleanState('bookmarks')
    const top = useBooleanState('top')
    const selectedCountrySlug = useArrayState('country')
    const selectedCitySlug = useArrayState('city')
    const selectedPlaceType = useArrayState('type')
    const selectedPlaceTag = useArrayState('tag')

    const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''))

    const [selectedSort, setSelectedSort] = useQueryState('sort', parseAsStringLiteral(allSort).withDefault('name'))

    const showMap = useBooleanState('map')
    const showStats = useBooleanState('stats')
    const tableView = useBooleanState('table')

    // query
    const trpc = useTRPC()
    const queryClient = useQueryClient()

    const {data: bookmarks} = useSuspenseQuery({
        queryKey: ['bookmarks'],
        queryFn: async () => BookmarksSchema.parse(await getCookie('bookmarks')),
    })

    const toggleBookmark = (id: string) => {
        const newBookmarks = bookmarks.includes(id) ? bookmarks.filter(f => f !== id) : [...bookmarks, id]
        setCookie('bookmarks', JSON.stringify(newBookmarks))
        queryClient.invalidateQueries({queryKey: ['bookmarks']})
    }

    const {data: allCountry} = useSuspenseQuery(trpc.GetAllCountry.queryOptions({sort: 'place_count'}))
    const {data: allCity} = useSuspenseQuery(trpc.GetAllCity.queryOptions({sort: 'place_count'}))
    const {data: allPlaceType} = useSuspenseQuery(trpc.GetAllPlaceType.queryOptions())
    const {data: allPlaceTag} = useSuspenseQuery(trpc.GetAllPlaceTag.queryOptions())

    const {status: searchStatus, data: searchResult} = useQuery(trpc.SearchPlaceFilter.queryOptions({query}))
    const {status: allPlaceStatus, data: allPlace} = useQuery(
        trpc.GetAllPlace.queryOptions({
            filter: {
                id: showBookmarks.value ? bookmarks : undefined,
                top: top.value,
                countrySlug: selectedCountrySlug.value,
                citySlug: selectedCitySlug.value,
                placeType: selectedPlaceType.value,
                placeTag: selectedPlaceTag.value,
            },
            query,
            sort: selectedSort,
        })
    )

    // derived state
    const isPending = searchStatus === 'pending' || allPlaceStatus === 'pending'
    const isError = searchStatus === 'error' || allPlaceStatus === 'error'

    if (isError) throw new Error('Failed to load data')

    // single city for image
    const singleCity = (() => {
        if (selectedCountrySlug.value.length > 0) return undefined
        if (selectedCitySlug.value.length === 1) return allCity.find(city => city.slug === selectedCitySlug.value[0])
    })()

    // active filter
    const activeFilter: ActiveFilter[] = [
        ...selectedCountrySlug.value.map(countrySlug => {
            queryClient.prefetchQuery(
                trpc.GetAllPlace.queryOptions({
                    filter: {
                        id: showBookmarks.value ? bookmarks : undefined,
                        top: top.value,
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
                        id: showBookmarks.value ? bookmarks : undefined,
                        top: top.value,
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
                        id: showBookmarks.value ? bookmarks : undefined,
                        top: top.value,
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
                        id: showBookmarks.value ? bookmarks : undefined,
                        top: top.value,
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
                id: showBookmarks.value ? undefined : bookmarks,
                top: top.value,
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
                id: showBookmarks.value ? bookmarks : undefined,
                top: !top.value,
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
            {singleCity && <CityImage city={singleCity} />}

            <MenuBarTray>
                {activeFilter.map(filter => {
                    const Icon = getIcon(filter.type)
                    return (
                        <button key={filter.title} className="shrink-0 active:opacity-60" onClick={() => filter.onRemove()}>
                            <MenuBarItem active>
                                <Icon weight="duotone" />
                                <p>{filter.title}</p>
                                <X weight="bold" />
                            </MenuBarItem>
                        </button>
                    )
                })}

                <button className="active:opacity-60" onClick={() => showBookmarks.toggle()}>
                    <MenuBarItem active={showBookmarks.value}>
                        <Heart weight="fill" />
                        <p>Bookmarks</p>
                    </MenuBarItem>
                </button>
                <button className="active:opacity-60" onClick={() => top.toggle()}>
                    <MenuBarItem active={top.value}>
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
                    toImage={country => ({imageURL: countryFlag(country.code)})}
                    toTitle={country => country.name}
                    toSubtitle={country => `${country.place_count} places`}
                    onScreen={country =>
                        queryClient.prefetchQuery(
                            trpc.GetAllPlace.queryOptions({
                                filter: {
                                    id: showBookmarks.value ? bookmarks : undefined,
                                    top: top.value,
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
                <MenuBarSelect
                    icon={City}
                    placeholder="City"
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
                                    id: showBookmarks.value ? bookmarks : undefined,
                                    top: top.value,
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
                <MenuBarSelect
                    icon={ForkKnife}
                    placeholder="Type"
                    allItem={allPlaceType}
                    onSelect={placeType => selectedPlaceType.toggle(placeType.type_name)}
                    isActive={placeType => selectedPlaceType.value.includes(placeType.type_name)}
                    toId={placeType => placeType.type_name}
                    toTitle={placeType => placeType.type_name}
                    toSubtitle={placeType => `${placeType.place_count} places`}
                    onScreen={placeType =>
                        queryClient.prefetchQuery(
                            trpc.GetAllPlace.queryOptions({
                                filter: {
                                    id: showBookmarks.value ? bookmarks : undefined,
                                    top: top.value,
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
                <MenuBarSelect
                    icon={Tag}
                    placeholder="Tag"
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
                                    id: showBookmarks.value ? bookmarks : undefined,
                                    top: top.value,
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

                <MenuBarSort
                    selectedSort={selectedSort}
                    allSort={allSort}
                    onSelect={option => setSelectedSort(option)}
                    toIcon={option =>
                        ({
                            name: TextT,
                            country: Flag,
                            city: City,
                        })[option]
                    }
                    toTitle={option =>
                        ({
                            name: 'Name',
                            country: 'Country',
                            city: 'City',
                        })[option]
                    }
                    onScreen={sort =>
                        queryClient.prefetchQuery(
                            trpc.GetAllPlace.queryOptions({
                                filter: {
                                    id: showBookmarks.value ? bookmarks : undefined,
                                    top: top.value,
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
            </MenuBarTray>

            <Section>
                <div className="flex flex-col items-start gap-2 pt-6">
                    <SearchBarFilter query={query} setQuery={setQuery} />
                </div>

                <SectionHeader title="Views" />
                <ButtonTray>
                    <button onClick={() => showMap.toggle()} className="active:opacity-60" title="Map">
                        <SearchBarButton active={showMap.value}>
                            <MapTrifold weight="bold" />
                            <p>Map</p>
                        </SearchBarButton>
                    </button>
                    <button onClick={() => showStats.toggle()} className="active:opacity-60" title="Stats">
                        <SearchBarButton active={showStats.value}>
                            <ChartLineUp weight="bold" />
                            <p>Stats</p>
                        </SearchBarButton>
                    </button>
                    <button onClick={() => tableView.toggle()} className="active:opacity-60" title="Table">
                        <SearchBarButton active={tableView.value}>
                            <Table weight="bold" />
                            <p>Table</p>
                        </SearchBarButton>
                    </button>
                </ButtonTray>

                {isPending ? (
                    <Loading />
                ) : (
                    <>
                        {searchResult.length > 0 && (
                            <>
                                <SectionHeader title="Filters" subtitle={`${searchResult.length} results`} />
                                <ButtonTray>
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
                                                        id: showBookmarks.value ? bookmarks : undefined,
                                                        top: top.value,
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
                                                        id: showBookmarks.value ? bookmarks : undefined,
                                                        top: top.value,
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
                                                        id: showBookmarks.value ? bookmarks : undefined,
                                                        top: top.value,
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
                                                        id: showBookmarks.value ? bookmarks : undefined,
                                                        top: top.value,
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
                                                <Badge active={active}>
                                                    <Icon weight="duotone" />
                                                    <p>{result.name}</p>
                                                    {active ? <X weight="bold" /> : <Plus weight="bold" />}
                                                </Badge>
                                            </button>
                                        )
                                    })}
                                </ButtonTray>
                            </>
                        )}

                        <SectionHeader title="Places" subtitle={`${allPlace.length > 0 ? allPlace.length : 'No'} results`} />
                        {allPlace.length > 0 && (
                            <>
                                {showMap.value && <PlacesMap allPlace={allPlace} />}
                                {showStats.value && <PlacesStats allPlace={allPlace} />}

                                {tableView.value ? (
                                    <PlaceTable allPlace={allPlace} />
                                ) : (
                                    <GridStack>
                                        {allPlace.map(place => (
                                            <PlaceCard key={place.id} place={place} bookmark={bookmarks.includes(place.id)} onBookmark={() => toggleBookmark(place.id)} />
                                        ))}
                                    </GridStack>
                                )}
                            </>
                        )}
                    </>
                )}
            </Section>
        </>
    )
}
