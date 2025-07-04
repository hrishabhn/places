'use client'

import {PlacesMap} from './map'

import {City as CityIcon, Flag as FlagIcon, ForkKnife as ForkKnifeIcon, Heart as HeartIcon, List as ListIcon, MapTrifold as MapTrifoldIcon, Plus as PlusIcon, Star as StarIcon, Table as TableIcon, Tag as TagIcon, TextT as TextTIcon, X as XIcon} from '@phosphor-icons/react'
import {useMutation, useQuery, useQueryClient, useSuspenseQuery} from '@tanstack/react-query'
import {parseAsString, parseAsStringLiteral, useQueryState} from 'nuqs'
import {useEffect} from 'react'

import {CityImage} from '@/app/views/city/image'
import {PlaceGrid} from '@/app/views/place/grid'
import {getPlaceIcon} from '@/app/views/place/place-icon'
import {PlaceTable} from '@/app/views/place/table'

import {type Place} from '@/server/types'

import {getBookmarks, toggleBookmark} from '@/model/bookmarks'
import {countryFlag} from '@/model/util'

import {useArrayState, useBooleanState} from '@/lib/hooks/nuqs'
import {useTRPC} from '@/lib/trpc'

import {Badge, ButtonTray} from '@/components/ui'
import {type ActiveFilter} from '@/components/views/filter'
import {getIcon} from '@/components/views/get-icon'
import {Loading} from '@/components/views/loading'
import {MenuBarItem, MenuBarSelect, MenuBarSort, MenuBarTray} from '@/components/views/menu-bar'
import {SearchBarButton, SearchBarFilter} from '@/components/views/search'
import {Section, SectionHeader} from '@/components/views/section'

const allSort = ['name', 'country', 'city'] as const
const allView = ['list', 'table', 'map'] as const

type View = (typeof allView)[number]

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

    const [selectedView, setSelectedView] = useQueryState('view', parseAsStringLiteral(allView).withDefault('list'))

    // query
    const trpc = useTRPC()
    const queryClient = useQueryClient()

    const {data: bookmarks} = useSuspenseQuery({
        queryKey: ['bookmarks'],
        queryFn: async () => await getBookmarks(),
    })

    useEffect(() => {
        if (bookmarks.length === 0) showBookmarks.setFalse()
    }, [bookmarks.length, showBookmarks])

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
                                <XIcon weight="bold" />
                            </MenuBarItem>
                        </button>
                    )
                })}

                {bookmarks.length > 0 && (
                    <button className="active:opacity-60" onClick={() => showBookmarks.toggle()}>
                        <MenuBarItem active={showBookmarks.value}>
                            <HeartIcon weight="fill" />
                            <p>Bookmarks</p>
                        </MenuBarItem>
                    </button>
                )}
                <button className="active:opacity-60" onClick={() => top.toggle()}>
                    <MenuBarItem active={top.value}>
                        <StarIcon weight="fill" />
                        <p>Top</p>
                    </MenuBarItem>
                </button>
                <MenuBarSelect
                    icon={FlagIcon}
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
                    icon={CityIcon}
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
                    icon={ForkKnifeIcon}
                    placeholder="Type"
                    allItem={allPlaceType}
                    onSelect={placeType => selectedPlaceType.toggle(placeType.type_name)}
                    isActive={placeType => selectedPlaceType.value.includes(placeType.type_name)}
                    toId={placeType => placeType.type_name}
                    toImage={placeType => ({icon: getPlaceIcon(placeType.type_name)})}
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
                    icon={TagIcon}
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
                            name: TextTIcon,
                            country: FlagIcon,
                            city: CityIcon,
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
                    {allView.map(view => {
                        const Icon = {
                            list: ListIcon,
                            table: TableIcon,
                            map: MapTrifoldIcon,
                        }[view]

                        const title = {
                            list: 'List',
                            table: 'Table',
                            map: 'Map',
                        }[view]

                        return (
                            <button key={view} className="active:opacity-60" onClick={() => setSelectedView(view)}>
                                <SearchBarButton active={selectedView === view}>
                                    <Icon weight="bold" />
                                    <p>{title}</p>
                                </SearchBarButton>
                            </button>
                        )
                    })}
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
                                                    {active ? <XIcon weight="bold" /> : <PlusIcon weight="bold" />}
                                                </Badge>
                                            </button>
                                        )
                                    })}
                                </ButtonTray>
                            </>
                        )}

                        <SectionHeader title="Places" subtitle={`${allPlace.length > 0 ? allPlace.length : 'No'} results`} />
                        <PlacesStack allPlace={allPlace} view={selectedView} />
                    </>
                )}
            </Section>
        </>
    )
}

function PlacesStack({allPlace, view}: {allPlace: Place[]; view: View}) {
    const queryClient = useQueryClient()

    const {data: bookmarks} = useSuspenseQuery({
        queryKey: ['bookmarks'],
        queryFn: async () => await getBookmarks(),
    })

    const {mutate: toggle} = useMutation({mutationFn: async (id: string) => await queryClient.setQueryData(['bookmarks'], await toggleBookmark(id))})

    if (allPlace.length === 0) return null

    switch (view) {
        case 'list':
            return <PlaceGrid allPlace={allPlace} bookmarks={bookmarks} onToggleBookmark={id => toggle(id)} />

        case 'table':
            return <PlaceTable allPlace={allPlace} bookmarks={bookmarks} onToggleBookmark={id => toggle(id)} />

        case 'map':
            return <PlacesMap allPlace={allPlace} />
    }
}
