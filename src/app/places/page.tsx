'use client'

import {City, Flag, ForkKnife, Star, Tag, X} from '@phosphor-icons/react'
import {useQuery} from '@tanstack/react-query'
import {parseAsBoolean, useQueryState} from 'nuqs'

import {CityImage} from '@/app/views/city/image'
import {PlaceCard} from '@/app/views/place/card'

import {countryFlag} from '@/model/util'

import {useArrayState} from '@/lib/hooks/array-state'
import {useTRPC} from '@/lib/trpc'

import {Badge, Callout} from '@/components/ui'
import {GridStack} from '@/components/views/grid'
import {HomeInfoItem, HomeInfoTray} from '@/components/views/info'
import {Loading} from '@/components/views/loading'
import {Section} from '@/components/views/section'

export default function PlacesPage() {
    const [top, setTop] = useQueryState('top', parseAsBoolean.withDefault(false))
    const selectedCountrySlug = useArrayState('country')
    const selectedCitySlug = useArrayState('city')
    const selectedPlaceType = useArrayState('type')
    const selectedPlaceTag = useArrayState('tag')

    const trpc = useTRPC()
    const {status: allCountryStatus, data: allCountry} = useQuery(trpc.GetAllCountry.queryOptions({sort: 'place_count'}))
    const {status: allCityStatus, data: allCity} = useQuery(trpc.GetAllCity.queryOptions({sort: 'place_count'}))
    const {status: allPlaceTypeStatus, data: allPlaceType} = useQuery(trpc.GetAllPlaceType.queryOptions())
    const {status: allPlaceTagStatus, data: allPlaceTag} = useQuery(trpc.GetAllPlaceTag.queryOptions())
    const {status: allPlaceStatus, data: allPlace} = useQuery(
        trpc.GetAllPlace.queryOptions({
            filter: {
                top,
                countrySlug: selectedCountrySlug.value,
                citySlug: selectedCitySlug.value,
                placeType: selectedPlaceType.value,
                placeTag: selectedPlaceTag.value,
            },
        })
    )

    if (allCountryStatus === 'pending' || allCityStatus === 'pending' || allPlaceTypeStatus === 'pending' || allPlaceTagStatus === 'pending') return <Loading />
    if (allCountryStatus === 'error' || allCityStatus === 'error' || allPlaceTypeStatus === 'error' || allPlaceTagStatus === 'error' || allPlaceStatus === 'error')
        return <Callout theme="error" message="Error loading data" />

    // single city for image
    const singleCity = (() => {
        if (selectedCountrySlug.value.length > 0) return undefined
        if (selectedCitySlug.value.length === 1) return allCity.find(city => city.slug === selectedCitySlug.value[0])
    })()

    return (
        <>
            {singleCity && <CityImage city={singleCity} />}
            <Section>
                <HomeInfoTray>
                    {selectedCountrySlug.value.map(countrySlug => (
                        <button key={countrySlug} className="active:opacity-60" onClick={() => selectedCountrySlug.remove(countrySlug)}>
                            <Badge active>
                                <X weight="bold" />
                                <p>{allCountry.find(country => country.slug === countrySlug)?.name || countrySlug}</p>
                            </Badge>
                        </button>
                    ))}
                    {selectedCitySlug.value.map(citySlug => (
                        <button key={citySlug} className="active:opacity-60" onClick={() => selectedCitySlug.remove(citySlug)}>
                            <Badge active>
                                <X weight="bold" />
                                <p>{allCity.find(city => city.slug === citySlug)?.name || citySlug}</p>
                            </Badge>
                        </button>
                    ))}
                    {selectedPlaceType.value.map(placeType => (
                        <button key={placeType} className="active:opacity-60" onClick={() => selectedPlaceType.remove(placeType)}>
                            <Badge active>
                                <X weight="bold" />
                                <p>{placeType}</p>
                            </Badge>
                        </button>
                    ))}
                    {selectedPlaceTag.value.map(placeTag => (
                        <button key={placeTag} className="active:opacity-60" onClick={() => selectedPlaceTag.remove(placeTag)}>
                            <Badge active>
                                <X weight="bold" />
                                <p>{placeTag}</p>
                            </Badge>
                        </button>
                    ))}

                    <button className="active:opacity-60" onClick={() => setTop(!top)}>
                        <Badge active={top}>
                            <Star weight="fill" />
                            <p>Top</p>
                        </Badge>
                    </button>
                    <HomeInfoItem
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
                    <HomeInfoItem
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
                    <HomeInfoItem
                        icon={ForkKnife}
                        placeholder="Type"
                        allItem={allPlaceType}
                        onSelect={placeType => selectedPlaceType.toggle(placeType)}
                        isActive={placeType => selectedPlaceType.value.includes(placeType)}
                        toId={placeType => placeType}
                        toTitle={placeType => placeType}
                    />
                    <HomeInfoItem
                        icon={Tag}
                        placeholder="Tag"
                        allItem={allPlaceTag}
                        onSelect={placeTag => selectedPlaceTag.toggle(placeTag)}
                        isActive={placeTag => selectedPlaceTag.value.includes(placeTag)}
                        toId={placeTag => placeTag}
                        toTitle={placeTag => placeTag}
                    />

                    <div className="grow" />
                    {allPlaceStatus === 'success' && <Badge active>{allPlace.length} places</Badge>}
                </HomeInfoTray>

                {allPlaceStatus === 'pending' ? (
                    <Loading />
                ) : (
                    <GridStack>
                        {allPlace.map(place => (
                            <PlaceCard key={place.id} place={place} />
                        ))}
                    </GridStack>
                )}
            </Section>
        </>
    )
}

// type PlacesInfoTrayProps = {
