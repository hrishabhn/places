'use client'

import {City, Flag, ForkKnife, MapTrifold, Star, Tag, X} from '@phosphor-icons/react'
import {useSuspenseQuery} from '@tanstack/react-query'
import {parseAsBoolean, useQueryState} from 'nuqs'
import {Suspense} from 'react'

import {CityImage} from '@/app/views/city/image'
import {PlaceCard} from '@/app/views/place/card'

import {type Place} from '@/server/types'

import {countryFlag} from '@/model/util'

import {useArrayState} from '@/lib/hooks/array-state'
import {useTRPC} from '@/lib/trpc'

import {Heading} from '@/components/layout'
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

    if (allPlace.length === 0)
        return (
            <div className="py-3">
                <Heading size="h3" withoutPadding>
                    No results
                </Heading>
                <Heading size="h5" withoutPadding>
                    Try adjusting the filters
                </Heading>
            </div>
        )

    return (
        <>
            <PlacesInfo allPlace={allPlace} />
            <GridStack>
                {allPlace.map(place => (
                    <PlaceCard key={place.id} place={place} />
                ))}
            </GridStack>
        </>
    )
}

function PlacesInfo({allPlace}: {allPlace: Place[]}) {
    const [showMap, setShowMap] = useQueryState('map', parseAsBoolean.withDefault(false))

    return (
        <>
            <InfoBar>
                <p>{allPlace.length} places</p>
                <div className="grow" />
                <button className="active:opacity-60" onClick={() => setShowMap(!showMap)}>
                    <IconButton theme="hover" icon={MapTrifold} active={showMap} />
                </button>
            </InfoBar>

            {showMap && (
                <div className="mb-4 aspect-square max-h-96 w-full overflow-hidden rounded-md ring-1 ring-line sm:aspect-video dark:ring-line-dark">
                    <MapView allPlace={allPlace} />
                </div>
            )}
        </>
    )
}
