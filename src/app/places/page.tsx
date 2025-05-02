'use client'

import {PlacesMap} from './map'
import {PlacesSearch} from './search'
import {PlacesStats} from './stats'

import {ChartLineUp, City, Flag, ForkKnife, List, MagnifyingGlass, MapTrifold, Star, Table, Tag, X} from '@phosphor-icons/react'
import {useSuspenseQuery} from '@tanstack/react-query'
import {Suspense} from 'react'
import {useKey} from 'react-use'

import {CityImage} from '@/app/views/city/image'
import {PlaceCard} from '@/app/views/place/card'
import {PlaceTable} from '@/app/views/place/table'

import {type GetAllPlaceOptions} from '@/server/procedures/get-all-place'

import {countryFlag} from '@/model/util'

import {useArrayState, useBooleanState} from '@/lib/hooks/nuqs'
import {useTRPC} from '@/lib/trpc'

import {Heading} from '@/components/layout'
import {Badge, IconButton} from '@/components/ui'
import {type ActiveFilter, FilterBar, InfoBar} from '@/components/views/filter'
import {GridStack} from '@/components/views/grid'
import {Loading} from '@/components/views/loading'
import {MenuBarItem, MenuBarSelect, MenuBarTray} from '@/components/views/menu-bar'
import {Section} from '@/components/views/section'

export default function PlacesPage() {
    // state
    const top = useBooleanState('top')
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
                        options={{
                            filter: {
                                top: top.value,
                                countrySlug: selectedCountrySlug.value,
                                citySlug: selectedCitySlug.value,
                                placeType: selectedPlaceType.value,
                                placeTag: selectedPlaceTag.value,
                            },
                            sort: 'name',
                        }}
                    />
                </Suspense>
            </Section>
        </>
    )
}

function PlacesStack({options}: {options: GetAllPlaceOptions}) {
    // query
    const trpc = useTRPC()
    const {data: allPlace} = useSuspenseQuery(trpc.GetAllPlace.queryOptions(options))

    // state
    const showSearch = useBooleanState('search')
    const showMap = useBooleanState('map')
    const showStats = useBooleanState('stats')
    const tableView = useBooleanState('table')

    // effect
    useKey('/', e => {
        e.preventDefault()
        showSearch.setTrue()
    })

    return (
        <>
            <InfoBar>
                <p>{allPlace.length} places</p>
                <div className="grow" />
                <button onClick={() => showSearch.toggle()} className="active:opacity-60">
                    <IconButton theme="hover" icon={MagnifyingGlass} active={showSearch.value} />
                </button>
                <button onClick={() => showMap.toggle()} className="active:opacity-60">
                    <IconButton theme="hover" icon={MapTrifold} active={showMap.value} />
                </button>
                <button onClick={() => showStats.toggle()} className="active:opacity-60">
                    <IconButton theme="hover" icon={ChartLineUp} active={showStats.value} />
                </button>
                <button onClick={() => tableView.toggle()} className="active:opacity-60">
                    <IconButton theme="hover" icon={tableView ? Table : List} active={tableView.value} />
                </button>
            </InfoBar>

            <PlacesSearch show={showSearch.value} onHide={() => showSearch.setFalse()} />
            {showMap.value && <PlacesMap allPlace={allPlace} />}
            {showStats.value && <PlacesStats allPlace={allPlace} />}

            {allPlace.length === 0 ? (
                <div className="py-3">
                    <Heading size="h3" withoutPadding>
                        No results
                    </Heading>
                    <Heading size="h5" withoutPadding>
                        Try adjusting the filters
                    </Heading>
                </div>
            ) : tableView.value ? (
                <PlaceTable allPlace={allPlace} />
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
