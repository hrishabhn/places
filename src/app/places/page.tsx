'use client'

import {PlacesMap} from './map'
import {PlacesStats} from './stats'

import {ChartLineUp, City, Flag, ForkKnife, MapTrifold, Plus, Star, Table, Tag, TextT, X} from '@phosphor-icons/react'
import {useQuery, useSuspenseQuery} from '@tanstack/react-query'
import {parseAsString, parseAsStringLiteral, useQueryState} from 'nuqs'

import {CityImage} from '@/app/views/city/image'
import {PlaceCard} from '@/app/views/place/card'
import {PlaceTable} from '@/app/views/place/table'

import {countryFlag} from '@/model/util'

import {useArrayState, useBooleanState} from '@/lib/hooks/nuqs'
import {useTRPC} from '@/lib/trpc'

import {Heading} from '@/components/layout'
import {Badge, ButtonTray} from '@/components/ui'
import {type ActiveFilter, FilterBar} from '@/components/views/filter'
import {getIcon} from '@/components/views/get-icon'
import {GridStack} from '@/components/views/grid'
import {Loading} from '@/components/views/loading'
import {MenuBarItem, MenuBarSelect, MenuBarSort, MenuBarTray} from '@/components/views/menu-bar'
import {SearchBarButton, SearchBarFilter} from '@/components/views/search'
import {Section} from '@/components/views/section'

const allSort = ['name', 'country', 'city'] as const

export default function PlacesPage() {
    // state
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
    const {data: allCountry} = useSuspenseQuery(trpc.GetAllCountry.queryOptions({sort: 'place_count'}))
    const {data: allCity} = useSuspenseQuery(trpc.GetAllCity.queryOptions({sort: 'place_count'}))
    const {data: allPlaceType} = useSuspenseQuery(trpc.GetAllPlaceType.queryOptions())
    const {data: allPlaceTag} = useSuspenseQuery(trpc.GetAllPlaceTag.queryOptions())

    const {status: searchStatus, data: searchResult} = useQuery(trpc.SearchPlaceFilter.queryOptions({query}))
    const {status: allPlaceStatus, data: allPlace} = useQuery(
        trpc.GetAllPlace.queryOptions({
            filter: {
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
        ...selectedCountrySlug.value.map(countrySlug => ({
            title: allCountry.find(country => country.slug === countrySlug)?.name || countrySlug,
            type: 'country' as const,
            onRemove: () => selectedCountrySlug.remove(countrySlug),
        })),
        ...selectedCitySlug.value.map(citySlug => ({
            title: allCity.find(city => city.slug === citySlug)?.name || citySlug,
            type: 'city' as const,
            onRemove: () => selectedCitySlug.remove(citySlug),
        })),
        ...selectedPlaceType.value.map(placeType => ({
            title: placeType,
            type: 'place_type' as const,
            onRemove: () => selectedPlaceType.remove(placeType),
        })),
        ...selectedPlaceTag.value.map(placeTag => ({
            title: placeTag,
            type: 'place_tag' as const,
            onRemove: () => selectedPlaceTag.remove(placeTag),
        })),
    ]

    return (
        <>
            {singleCity && <CityImage city={singleCity} />}

            <MenuBarTray>
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
                />
            </MenuBarTray>

            {activeFilter.length > 0 && (
                <FilterBar>
                    {activeFilter.map(filter => {
                        const Icon = getIcon(filter.type)
                        return (
                            <button key={filter.title} className="active:opacity-60" onClick={() => filter.onRemove()}>
                                <Badge>
                                    <Icon weight="duotone" />
                                    <p>{filter.title}</p>
                                    <X weight="bold" />
                                </Badge>
                            </button>
                        )
                    })}
                </FilterBar>
            )}

            <Section>
                <div className="flex flex-col items-start gap-2 pb-4 pt-8">
                    <SearchBarFilter query={query} setQuery={setQuery} />

                    <ButtonTray>
                        <button onClick={() => showMap.toggle()} className="active:opacity-60" title="Map">
                            <SearchBarButton icon={MapTrifold} text="Map" active={showMap.value} />
                        </button>
                        <button onClick={() => showStats.toggle()} className="active:opacity-60" title="Stats">
                            <SearchBarButton icon={ChartLineUp} text="Stats" active={showStats.value} />
                        </button>
                        <button onClick={() => tableView.toggle()} className="active:opacity-60" title="Table">
                            <SearchBarButton icon={Table} text="Table" active={tableView.value} />
                        </button>
                    </ButtonTray>
                </div>

                {isPending ? (
                    <Loading />
                ) : (
                    <>
                        {searchResult.length > 0 && (
                            <>
                                <Heading size="h2">Filters</Heading>
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
                        <Heading size="h2">Places</Heading>
                        {allPlace.length > 0 ? (
                            <>
                                {showMap.value && <PlacesMap allPlace={allPlace} />}
                                {showStats.value && <PlacesStats allPlace={allPlace} />}

                                {tableView.value ? (
                                    <PlaceTable allPlace={allPlace} />
                                ) : (
                                    <GridStack>
                                        {allPlace.map(place => (
                                            <PlaceCard key={place.id} place={place} />
                                        ))}
                                    </GridStack>
                                )}
                            </>
                        ) : (
                            <>
                                <Heading size="h4" withoutPadding>
                                    No results
                                </Heading>
                                <Heading size="h5" withoutPadding>
                                    Try adjusting the filters
                                </Heading>
                            </>
                        )}
                    </>
                )}
            </Section>
        </>
    )
}
